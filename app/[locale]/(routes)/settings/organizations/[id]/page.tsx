'use client'
import React from 'react'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'

type OrganizationsViewProps = {
  organizations?: OrganizationEntity
  description: string
}

const OrganizationsView = ({
  organizations,
  description
}: OrganizationsViewProps) => {
  return (
    <div>
      <h1> Ledger Name </h1>
    </div>
  )
}

export default OrganizationsView
