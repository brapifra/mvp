export interface Entity<T extends EntityId> {
  id: T;
  createdAt: Date;
  updatedAt: Date;
}

export interface EntityId {
  toString(): string;
}
