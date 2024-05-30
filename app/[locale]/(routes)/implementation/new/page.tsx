'use client'
import { organizationsFormSchemaNew } from '@/[locale]/(routes)/settings/organizations/organizations-form-schema-new'
import OrganizationsViewNew from '@/[locale]/(routes)/settings/organizations/organizations-view-new'



const Page = () => {
  const data = {
    legalName: 'Test Legal Name',
    address: {
      country: 'US',
      state: 'CA'
    }
  }
  
  
  return (
    <div>
      <h1>Form Field Organization</h1>
      <OrganizationsViewNew data={data}/>
    </div>
  )
}

export default Page