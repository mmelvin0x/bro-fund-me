use anchor_lang::prelude::*;

declare_id!("FShBKKMYh5LbsFCxaJnzfqA4z6SxhsW93RhzM971pamE");

#[program]
pub mod crowdfunding {
    use anchor_lang::solana_program::entrypoint::ProgramResult;
    use anchor_lang::solana_program::program::invoke;
    use anchor_lang::solana_program::system_instruction::{transfer};
    use ProgramError::{IncorrectProgramId, InsufficientFunds};
    use crate::ProgramError::IllegalOwner;
    use super::*;

    pub fn create(ctx: Context<Create>, name: String, description: String) -> ProgramResult {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.admin = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> ProgramResult {
        let campaign = &mut ctx.accounts.campaign;
        let user = &mut ctx.accounts.user;

        if campaign.admin != *user.key {
            return Err(IncorrectProgramId);
        }

        let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());
        if **campaign.to_account_info().lamports.borrow() - rent_balance < amount {
            return Err(InsufficientFunds);
        }

        **campaign.to_account_info().try_borrow_mut_lamports()? -= amount;
        **user.to_account_info().try_borrow_mut_lamports()? += amount;

        (&mut ctx.accounts.campaign).amount_donated -= amount;

        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> ProgramResult {
        let ix = transfer(&ctx.accounts.user.key(), &ctx.accounts.campaign.key(), amount);
        invoke(&ix, &[ctx.accounts.user.to_account_info(), ctx.accounts.campaign.to_account_info()])?;
        (&mut ctx.accounts.campaign).amount_donated += amount;
        Ok(())
    }

    pub fn close(ctx: Context<Close>) -> ProgramResult {
        if ctx.accounts.validate_account_owner() {
            return Err(IllegalOwner)
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=9000, seeds=[b"CAMPAIGN_DEMO".as_ref(), user.key().as_ref()], bump)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut, close = user)]
    pub campaign: Account<'info, Campaign>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Campaign {
    pub admin: Pubkey,
    pub name: String,
    pub description: String,
    pub amount_donated: u64,
}

impl<'info> Close<'info> {
    fn validate_account_owner(&self) -> bool {
        self.campaign.admin != *self.user.key
    }
}
