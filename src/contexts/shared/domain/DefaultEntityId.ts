import { v4 as uuidv4, validate, version } from 'uuid'
import { EntityId } from 'contexts/shared/domain/Entity'

export class DefaultEntityId implements EntityId {
  private uuid: string

  constructor(uuid?: string) {
    if (!uuid) {
      this.uuid = uuidv4()
    } else if (this.isUuidValid(uuid)) {
      this.uuid = uuid
    } else {
      throw Error(`Invalid UUID: ${uuid}.`)
    }
  }

  private isUuidValid(uuid: string): boolean {
    return validate(uuid) && version(uuid) === 4
  }

  toString(): string {
    return this.uuid
  }
}
