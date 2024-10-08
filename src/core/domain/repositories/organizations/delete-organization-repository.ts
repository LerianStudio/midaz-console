export interface DeleteOrganizationRepository {
  deleteOrganization: (organizationId: string) => Promise<void>
}
