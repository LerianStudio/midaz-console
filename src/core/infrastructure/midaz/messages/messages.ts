import { defineMessages } from '@/lib/intl'

export const apiErrorMessages = defineMessages({
  '0001': {
    id: 'error.midaz.duplicateLedgerName',
    defaultMessage:
      'A ledger with this name already exists in the organization. Please rename the ledger or choose a different organization to attach it to.'
  },
  '0002': {
    id: 'error.midaz.ledgerNameConflict',
    defaultMessage:
      'A ledger named {{name}} already exists in your organization. Please rename the ledger, or if you want to use the same name, consider creating a new ledger for a different division.'
  },
  '0003': {
    id: 'error.midaz.assetNameOrCodeDuplicate',
    defaultMessage:
      'An asset with the same name or code already exists in your ledger. Please modify the name or code of your new asset.'
  },
  '0004': {
    id: 'error.midaz.codeUpperCaseRequirement',
    defaultMessage:
      'The code must be in uppercase. Please ensure that the code is in uppercase format and try again.'
  },
  '0005': {
    id: 'error.midaz.currencyCodeStandardCompliance',
    defaultMessage:
      'Currency-type assets must comply with the ISO-4217 standard. Please use a currency code that conforms to ISO-4217 guidelines.'
  },
  '0006': {
    id: 'error.midaz.unmodifiableFieldError',
    defaultMessage:
      'Your request includes a field that cannot be modified. Please review your request and try again, removing any uneditable fields. Please refer to the documentation for guidance.'
  },
  '0007': {
    id: 'error.midaz.entityNotFound',
    defaultMessage:
      'No entity was found for the given ID. Please make sure to use the correct ID for the entity you are trying to manage.'
  },
  '0008': {
    id: 'error.midaz.actionNotPermitted',
    defaultMessage:
      'The action you are attempting is not allowed in the current environment. Please refer to the documentation for guidance.'
  },
  '0009': {
    id: 'error.midaz.missingFieldsInRequest',
    defaultMessage:
      'Your request is missing one or more required fields. Please refer to the documentation to ensure all necessary fields are included in your request.'
  },
  '0010': {
    id: 'error.midaz.accountTypeImmutable',
    defaultMessage:
      'The account type specified cannot be modified. Please ensure the correct account type is being used and try again.'
  },
  '0011': {
    id: 'error.midaz.inactiveAccountTypeError',
    defaultMessage:
      'The account type specified cannot be set to INACTIVE. Please ensure the correct account type is being used and try again.'
  },
  '0012': {
    id: 'error.midaz.accountBalanceDeletionError',
    defaultMessage:
      'An account or sub-account cannot be deleted if it has a remaining balance. Please ensure all remaining balances are transferred to another account before attempting to delete.'
  },
  '0013': {
    id: 'error.midaz.resourceAlreadyDeleted',
    defaultMessage:
      'The resource you are trying to delete has already been deleted. Ensure you are using the correct ID and try again.'
  },
  '0014': {
    id: 'error.midaz.segmentIdInactive',
    defaultMessage:
      'The Segment ID you are attempting to use is inactive. Please use another Segment ID and try again.'
  },
  '0015': {
    id: 'error.midaz.duplicateSegmentNameError',
    defaultMessage:
      'A segment with this name already exists for this ledger. Please try again with a different ledger or name.'
  },
  '0016': {
    id: 'error.midaz.balanceRemainingDeletionError',
    defaultMessage:
      'The asset cannot be deleted because there is a remaining balance. Please ensure all balances are cleared before attempting to delete again.'
  },
  '0017': {
    id: 'error.midaz.invalidScriptFormatError',
    defaultMessage:
      'The script provided in your request is invalid or in an unsupported format. Please verify the script format and try again.'
  },
  '0018': {
    id: 'error.midaz.insufficientFundsError',
    defaultMessage:
      'The transaction could not be completed due to insufficient funds in the account. Please add sufficient funds to your account and try again.'
  },
  '0019': {
    id: 'error.midaz.accountIneligibilityError',
    defaultMessage:
      'One or more accounts listed in the transaction are not eligible to participate. Please review the account statuses and try again.'
  },
  '0020': {
    id: 'error.midaz.aliasUnavailabilityError',
    defaultMessage:
      'The alias is already in use. Please choose a different alias and try again.'
  },
  '0021': {
    id: 'error.midaz.parentTransactionIdNotFound',
    defaultMessage:
      'The parentTransactionId does not correspond to any existing transaction. Please review the ID and try again.'
  },
  '0022': {
    id: 'error.midaz.immutableFieldError',
    defaultMessage:
      'The {{field}} field cannot be modified. Please remove this field from your request and try again.'
  },
  '0023': {
    id: 'error.midaz.transactionTimingRestriction',
    defaultMessage:
      'You can only perform another transaction using {{assetCode}} of {{amount}} from {{source}} to {{destination}} after {{timestampUnlock}}. Please wait until the specified time to try again.'
  },
  '0024': {
    id: 'error.midaz.accountStatusTransactionRestriction',
    defaultMessage:
      'The current statuses of the source and/or destination accounts do not permit transactions. Change the account status(es) and try again.'
  },
  '0025': {
    id: 'error.midaz.insufficientAccountBalanceError',
    defaultMessage:
      'The account does not have sufficient balance. Please try again with an amount that is less than or equal to the available balance.'
  },
  '0026': {
    id: 'error.midaz.transactionMethodRestriction',
    defaultMessage:
      'Transactions involving {{assetCode}} are not permitted for the specified source and/or destination. Please try again using accounts that allow transactions with {{assetCode}}.'
  },
  '0027': {
    id: 'error.midaz.duplicateTransactionTemplateCodeError',
    defaultMessage:
      'A transaction template with the code {{code}} already exists for your ledger. Please use a different code and try again.'
  },
  '0028': {
    id: 'error.midaz.duplicateAssetPairError',
    defaultMessage:
      'A pair for the assets {{baseAssetCode}}{{counterAssetCode}} already exists with the ID {{asset_rates.id}}. Please update the existing entry instead of creating a new one.'
  },
  '0029': {
    id: 'error.midaz.invalidParentAccountId',
    defaultMessage:
      'The specified parent account ID does not exist. Please verify the ID is correct and try your request again.'
  },
  '0030': {
    id: 'error.midaz.mismatchedAssetCode',
    defaultMessage:
      'The parent account ID you provided is associated with a different asset code than the one specified in your request. Please make sure the asset code matches that of the parent account, or use a different parent account ID and try again.'
  },
  '0031': {
    id: 'error.midaz.chartTypeNotFound',
    defaultMessage:
      'The chart type {{chartType}} does not exist. Please provide a valid chart type and refer to the documentation if you have any questions.'
  },
  '0032': {
    id: 'error.midaz.invalidCountryCode',
    defaultMessage:
      "The provided country code in the 'address.country' field does not conform to the ISO-3166 alpha-2 standard. Please provide a valid alpha-2 country code."
  },
  '0033': {
    id: 'error.midaz.invalidCodeFormat',
    defaultMessage:
      "The 'code' field must be alphanumeric, in upper case, and must contain at least one letter. Please provide a valid code."
  },
  '0034': {
    id: 'error.midaz.assetCodeNotFound',
    defaultMessage:
      'The provided asset code does not exist in our records. Please verify the asset code and try again.'
  },
  '0035': {
    id: 'error.midaz.portfolioIdNotFound',
    defaultMessage:
      'The provided portfolio ID does not exist in our records. Please verify the portfolio ID and try again.'
  },
  '0036': {
    id: 'error.midaz.segmentIdNotFound',
    defaultMessage:
      'The provided segment ID does not exist in our records. Please verify the segment ID and try again.'
  },
  '0037': {
    id: 'error.midaz.ledgerIdNotFound',
    defaultMessage:
      'The provided ledger ID does not exist in our records. Please verify the ledger ID and try again.'
  },
  '0038': {
    id: 'error.midaz.organizationIdNotFound',
    defaultMessage:
      'The provided organization ID does not exist in our records. Please verify the organization ID and try again.'
  },
  '0039': {
    id: 'error.midaz.parentOrganizationIdNotFound',
    defaultMessage:
      'The provided parent organization ID does not exist in our records. Please verify the parent organization ID and try again.'
  },
  '0040': {
    id: 'error.midaz.invalidType',
    defaultMessage:
      "The provided 'type' is not valid. Accepted types are: currency, crypto, commodities, or others. Please provide a valid type."
  },
  '0041': {
    id: 'error.midaz.tokenMissing',
    defaultMessage:
      'A valid token must be provided in the request header. Please include a token and try again.'
  },
  '0042': {
    id: 'error.midaz.invalidToken',
    defaultMessage:
      'The provided token is invalid or malformed. Please provide a valid token and try again.'
  },
  '0043': {
    id: 'error.midaz.tokenExpired',
    defaultMessage:
      'The provided token has expired. Please provide a valid token and try again.'
  },
  '0044': {
    id: 'error.midaz.insufficientPrivileges',
    defaultMessage:
      'You do not have the necessary permissions to perform this action. Please contact your administrator if you believe this is an error.'
  },
  '0045': {
    id: 'error.midaz.permissionEnforcementError',
    defaultMessage:
      'The enforcer is not configured properly. Please contact your administrator if you believe this is an error.'
  },
  '0046': {
    id: 'error.midaz.internalServerError',
    defaultMessage:
      'The server encountered an unexpected error. Please try again later or contact support.'
  },
  '0047': {
    id: 'error.midaz.badRequest',
    defaultMessage:
      'The server could not understand the request due to malformed syntax. Please check the listed fields and try again.'
  },
  '0048': {
    id: 'error.midaz.invalidDslFileFormat',
    defaultMessage:
      'The submitted DSL file {{fileName}} is in an incorrect format. Please ensure that the file follows the expected structure and syntax.'
  },
  '0049': {
    id: 'error.midaz.emptyDslFile',
    defaultMessage:
      'The submitted DSL file {{fileName}} is empty. Please provide a valid file with content.'
  },
  '0050': {
    id: 'error.midaz.metadataKeyLengthExceeded',
    defaultMessage:
      'The metadata key {{key}} exceeds the maximum allowed length of 100 characters. Please use a shorter key.'
  },
  '0051': {
    id: 'error.midaz.metadataValueLengthExceeded',
    defaultMessage:
      'The metadata value {{value}} exceeds the maximum allowed length of 100 characters. Please use a shorter value.'
  },
  '0052': {
    id: 'error.midaz.accountIdNotFound',
    defaultMessage:
      'The provided account ID does not exist in our records. Please verify the account ID and try again.'
  },
  '0053': {
    id: 'error.midaz.unexpectedFieldsInTheRequest',
    defaultMessage:
      'The request body contains more fields than expected. Please send only the allowed fields as per the documentation. The unexpected fields are listed in the fields object.'
  },
  '0054': {
    id: 'error.midaz.noAccountsFound',
    defaultMessage:
      'No accounts were found for the provided account IDs. Please verify the account IDs and try again.'
  },
  '0055': {
    id: 'error.midaz.assetIdNotFound',
    defaultMessage:
      'The provided asset ID does not exist in our records. Please verify the asset ID and try again.'
  },
  '0056': {
    id: 'error.midaz.noAssetsFound',
    defaultMessage:
      'No assets were found in the search. Please review the search criteria and try again.'
  },
  '0057': {
    id: 'error.midaz.noSegmentsFound',
    defaultMessage:
      'No segments were found in the search. Please review the search criteria and try again.'
  },
  '0058': {
    id: 'error.midaz.noPortfoliosFound',
    defaultMessage:
      'No portfolios were found in the search. Please review the search criteria and try again.'
  },
  '0059': {
    id: 'error.midaz.noOrganizationsFound',
    defaultMessage:
      'No organizations were found in the search. Please review the search criteria and try again.'
  },
  '0060': {
    id: 'error.midaz.noLedgersFound',
    defaultMessage:
      'No ledgers were found in the search. Please review the search criteria and try again.'
  },
  '0061': {
    id: 'error.midaz.balanceUpdateFailed',
    defaultMessage:
      'The balance could not be updated for the specified account ID. Please verify the account ID and try again.'
  },
  '0062': {
    id: 'error.midaz.noAccountIdsProvided',
    defaultMessage:
      'No account IDs were provided for the balance update. Please provide valid account IDs and try again.'
  },
  '0063': {
    id: 'error.midaz.failedToRetrieveAccountsByAliases',
    defaultMessage:
      'The accounts could not be retrieved using the specified aliases. Please verify the aliases for accuracy and try again.'
  },
  '0064': {
    id: 'error.midaz.noAccountsFoundSearch',
    defaultMessage:
      'No accounts were found in the search. Please review the search criteria and try again.'
  },
  '0065': {
    id: 'error.midaz.invalidPathParameter',
    defaultMessage:
      'The provided path parameter {{parameter_name}} is not in the expected format. Please ensure the parameter adheres to the required format and try again.'
  },
  '0066': {
    id: 'error.midaz.invalidAccountType',
    defaultMessage:
      "The provided 'type' is not valid. Accepted types are: deposit, savings, loans, marketplace, creditCard or external. Please provide a valid type."
  },
  '0067': {
    id: 'error.midaz.invalidMetadataNesting',
    defaultMessage:
      'The metadata object cannot contain nested values. Please ensure that the value {{value}} is not nested and try again.'
  },
  '0068': {
    id: 'error.midaz.operationIdNotFound',
    defaultMessage:
      'The provided operation ID does not exist in our records. Please verify the operation ID and try again.'
  },
  '0069': {
    id: 'error.midaz.noOperationsFound',
    defaultMessage:
      'No operations were found in the search. Please review the search criteria and try again.'
  },
  '0070': {
    id: 'error.midaz.transactionIdNotFound',
    defaultMessage:
      'The provided transaction ID does not exist in our records. Please verify the transaction ID and try again.'
  },
  '0071': {
    id: 'error.midaz.noTransactionsFound',
    defaultMessage:
      'No transactions were found in the search. Please review the search criteria and try again.'
  },
  '0072': {
    id: 'error.midaz.invalidTransactionType',
    defaultMessage:
      "Only one transaction type ('amount', 'share', or 'remaining') must be specified in the '{{field}}' field for each entry. Please review your input and try again."
  },
  '0073': {
    id: 'error.midaz.transactionValueMismatch',
    defaultMessage:
      'The values for the source, the destination, or both do not match the specified transaction amount. Please verify the values and try again.'
  },
  '0074': {
    id: 'error.midaz.externalAccountModificationProhibited',
    defaultMessage:
      "Accounts of type 'external' cannot be deleted or modified as they are used for traceability with external systems. Please review your request and ensure operations are only performed on internal accounts."
  },
  '0075': {
    id: 'error.midaz.auditRecordNotRetrieved',
    defaultMessage:
      'The record {{id}} could not be retrieved for audit. Please verify that the submitted data is correct and try again.'
  },
  '0076': {
    id: 'error.midaz.auditTreeRecordNotFound',
    defaultMessage:
      'The record {{id}} does not exist in the audit tree. Please ensure the audit tree is available and try again.'
  },
  '0077': {
    id: 'error.midaz.invalidDateFormatError',
    defaultMessage:
      "The 'initialDate', 'finalDate', or both are in the incorrect format. Please use the 'yyyy-mm-dd' format and try again."
  },
  '0078': {
    id: 'error.midaz.invalidFinalDateError',
    defaultMessage:
      "The 'finalDate' cannot be earlier than the 'initialDate'. Please verify the dates and try again."
  },
  '0079': {
    id: 'error.midaz.dateRangeExceedsLimitError',
    defaultMessage:
      "The range between 'initialDate' and 'finalDate' exceeds the permitted limit of {{limit}} months. Please adjust the dates and try again."
  },
  '0080': {
    id: 'error.midaz.paginationLimitExceeded',
    defaultMessage:
      'The pagination limit exceeds the maximum allowed of {{pageLimit}} items per page. Please verify the limit and try again.'
  },
  '0081': {
    id: 'error.midaz.invalidSortOrder',
    defaultMessage:
      "The 'sort_order' field must be 'asc' or 'desc'. Please provide a valid sort order and try again."
  },
  '0082': {
    id: 'error.midaz.invalidQueryParameter',
    defaultMessage:
      "One or more query parameters are in an incorrect format. Please check the following parameters '{{parameter}}' and ensure they meet the required format before trying again."
  },
  '0083': {
    id: 'error.midaz.invalidDateRangeError',
    defaultMessage:
      "Both 'initialDate' and 'finalDate' fields are required and must be in the 'yyyy-mm-dd' format. Please provide valid dates and try again."
  },
  '0084': {
    id: 'error.midaz.duplicateIdempotencyKey',
    defaultMessage:
      "The idempotency key '{{key}}' is already in use. Please provide a unique key and try again."
  }
})
