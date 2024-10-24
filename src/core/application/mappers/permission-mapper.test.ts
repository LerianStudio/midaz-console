import { Permission } from 'casdoor-nodejs-sdk/lib/cjs/permission'
import {
  batchEnforceResponseToDto,
  permissionToCasbinRequest,
  filterBatchEnforceResponse
} from './permission-mapper'

describe('Permission Mapper', () => {
  const user = 'user1'

  describe('permissionToCasbinRequest', () => {
    it('should correctly map permission to Casbin request', () => {
      const input: Partial<Permission>[] = [
        { resources: ['resource1'], actions: ['action1'] },
        { resources: ['resource2'], actions: ['action2'] }
      ]
      const expectedOutput = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action2']
      ]
      expect(permissionToCasbinRequest(user, input as Permission[])).toEqual(
        expectedOutput
      )
    })

    it('should correctly map permission to Casbin request with multiples resources', () => {
      const input: Partial<Permission>[] = [
        { resources: ['resource1', 'resource2'], actions: ['action1'] },
        { resources: ['resource3'], actions: ['action2'] }
      ]
      const expectedOutput = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource3', 'action2']
      ]
      expect(permissionToCasbinRequest(user, input as Permission[])).toEqual(
        expectedOutput
      )
    })

    it('should correctly map permission to Casbin request with multiples actions', () => {
      const input: Partial<Permission>[] = [
        { resources: ['resource1'], actions: ['action1', 'action2'] },
        { resources: ['resource2'], actions: ['action3'] }
      ]
      const expectedOutput = [
        [user, 'resource1', 'action1'],
        [user, 'resource1', 'action2'],
        [user, 'resource2', 'action3']
      ]
      expect(permissionToCasbinRequest(user, input as Permission[])).toEqual(
        expectedOutput
      )
    })

    it('should correctly map permission to Casbin request with duplicates', () => {
      const input: Partial<Permission>[] = [
        { resources: ['resource1', 'resource2'], actions: ['action1'] },
        { resources: ['resource2'], actions: ['action2'] }
      ]
      const expectedOutput = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource2', 'action2']
      ]
      expect(permissionToCasbinRequest(user, input as Permission[])).toEqual(
        expectedOutput
      )
    })

    it('should handle if receives empty', () => {
      expect(permissionToCasbinRequest(user, [])).toEqual([])
    })
  })

  describe('filterBatchEnforceResponse', () => {
    it('should filter batch enforce response correctly', () => {
      const validation = [true, false, true]
      const input = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource3', 'action1']
      ]
      const expectedOutput = [
        [user, 'resource1', 'action1'],
        [user, 'resource3', 'action1']
      ]
      expect(filterBatchEnforceResponse(validation, input)).toEqual(
        expectedOutput
      )
    })

    it('should filter batch enforce response when validation is all false', () => {
      const validation = [false, false, false]
      const input = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource3', 'action1']
      ]
      expect(filterBatchEnforceResponse(validation, input)).toEqual([])
    })

    it('should filter batch enforce response when validation is empty', () => {
      const input = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource3', 'action1']
      ]
      expect(filterBatchEnforceResponse([], input)).toEqual([])
    })

    it('should handle empty input', () => {
      expect(filterBatchEnforceResponse([], [])).toEqual([])
    })
  })

  describe('batchEnforceResponseToDto', () => {
    it('should correctly map the batch enforce response to DTO', () => {
      const input = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource3', 'action1']
      ]

      const expectedOutput = {
        resource1: ['action1'],
        resource2: ['action1'],
        resource3: ['action1']
      }

      expect(batchEnforceResponseToDto(input)).toEqual(expectedOutput)
    })

    it('should correctly map the batch enforce response to DTO with duplicates', () => {
      const input = [
        [user, 'resource1', 'action1'],
        [user, 'resource2', 'action1'],
        [user, 'resource2', 'action2']
      ]

      const expectedOutput = {
        resource1: ['action1'],
        resource2: ['action1', 'action2']
      }

      expect(batchEnforceResponseToDto(input)).toEqual(expectedOutput)
    })

    it('should handle empty input', () => {
      expect(batchEnforceResponseToDto([])).toEqual({})
    })
  })
})
