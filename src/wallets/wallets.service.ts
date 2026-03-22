import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from './wallet.interface';

@Injectable()
export class WalletsService {
  private readonly wallets = new Map<string, Wallet>();
  private nextId = 1;

  list(): Wallet[] {
    return Array.from(this.wallets.values());
  }

  get(id: string): Wallet {
    const wallet = this.wallets.get(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  create(ownerInput: unknown, balanceInput?: unknown): Wallet {
    const owner = this.requireNonEmptyString(ownerInput, 'owner');
    const balance = balanceInput === undefined ? 0 : this.requireNumber(balanceInput, 'balance');
    const wallet: Wallet = {
      id: String(this.nextId++),
      owner,
      balance,
    };
    this.wallets.set(wallet.id, wallet);
    return wallet;
  }

  updateOwner(id: string, ownerInput: unknown): Wallet {
    const wallet = this.get(id);
    wallet.owner = this.requireNonEmptyString(ownerInput, 'owner');
    return wallet;
  }

  delete(id: string): Wallet {
    const wallet = this.get(id);
    this.wallets.delete(id);
    return wallet;
  }

  updateBalance(id: string, deltaInput: unknown): Wallet {
    const wallet = this.get(id);
    const delta = this.requireNumber(deltaInput, 'delta');
    wallet.balance += delta;
    return wallet;
  }

  private requireNonEmptyString(value: unknown, field: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(`${field} must be a string`);
    }
    const trimmed = value.trim();
    if (!trimmed) {
      throw new BadRequestException(`${field} must not be empty`);
    }
    return trimmed;
  }

  private requireNumber(value: unknown, field: string): number {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new BadRequestException(`${field} must be a finite number`);
    }
    return value;
  }
}
