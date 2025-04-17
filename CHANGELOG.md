# [2.2.0](https://github.com/LerianStudio/midaz-console/compare/v2.1.0...v2.2.0) (2025-04-17)


### Bug Fixes

* Removed entityID from required on Portfolios ([934d90d](https://github.com/LerianStudio/midaz-console/commit/934d90d7fd61a650e9c5d9d13cb1660442617884))
* Removed unused code ([e923b78](https://github.com/LerianStudio/midaz-console/commit/e923b7840695ed0e5c3dc05dd2bbfb03ae1661ab))


### Features

* Removed unused hook ([386f96b](https://github.com/LerianStudio/midaz-console/commit/386f96b4ee1db20df932a9f2195623aa5217597a))
* Removed unused hook ([451c551](https://github.com/LerianStudio/midaz-console/commit/451c551c857964cebd47f231a1bee87bac8969c5))
* Removed usePopulateCreateUpdateForm usage ([e481b72](https://github.com/LerianStudio/midaz-console/commit/e481b720ff8762735f2aba82183ee8d48608eeda))
* Removed usePopulateForm usage ([7179f3c](https://github.com/LerianStudio/midaz-console/commit/7179f3ccc622377533d11c56369e762042ea2e92))

# [2.1.0](https://github.com/LerianStudio/midaz-console/compare/v2.0.0...v2.1.0) (2025-04-17)


### Features

* rollback of improvement configurations on pipeline ([9c13289](https://github.com/LerianStudio/midaz-console/commit/9c13289d84569d6ced1dc99fdfc5ef5e29012cf9))

## [1.28.2](https://github.com/LerianStudio/midaz-console/compare/v1.28.1...v1.28.2) (2025-04-14)


### Bug Fixes

* trigger users client only if auth plugin is enabled ([987c268](https://github.com/LerianStudio/midaz-console/commit/987c268d181c55d1309d040e9b3f168e896b9f0a))

## [1.28.1](https://github.com/LerianStudio/midaz-console/compare/v1.28.0...v1.28.1) (2025-04-14)


### Bug Fixes

* redirect to organization edit page ([c305285](https://github.com/LerianStudio/midaz-console/commit/c3052854bbe7aad16dbf13763baf4399fef61817))
* remove unused const ([c8e77f0](https://github.com/LerianStudio/midaz-console/commit/c8e77f0e403ef1a09dae17ce03e82c594912f423))

# [1.28.0](https://github.com/LerianStudio/midaz-console/compare/v1.27.0...v1.28.0) (2025-04-14)


### Bug Fixes

* build error ([9d091a3](https://github.com/LerianStudio/midaz-console/commit/9d091a30d8fd33308b1f2c5976ae303d409d4177))
* change the import of PasswordField ([d463a9f](https://github.com/LerianStudio/midaz-console/commit/d463a9f61494a1adbe858f8ab8ce5418ebdeba16))
* define some fields as required and set max in zod schema ([48e570e](https://github.com/LerianStudio/midaz-console/commit/48e570ed02c95d167fd4c8bbd083f8922154e56f))
* delete unused component and change translation key ([fefb893](https://github.com/LerianStudio/midaz-console/commit/fefb893cd62cc9846c54242b27e09c6289a00364))
* fixed groups field name ([802f585](https://github.com/LerianStudio/midaz-console/commit/802f585a814dd110ef5838681623a6eea1df90cf))
* omit id when creating to fix type error ([65b525c](https://github.com/LerianStudio/midaz-console/commit/65b525c305b8cecc7a9417dc27b69fe2fec4ab7c))
* pass the password data directly into handleDialogOpen ([451d146](https://github.com/LerianStudio/midaz-console/commit/451d1468cb9b63daa48e0f93870d603e8efa4542))
* prevent enforce error when Auth is disabled by checking validate ([0b20b5b](https://github.com/LerianStudio/midaz-console/commit/0b20b5b6817197925aa059e5113a53116a7d7a4b))
* remove unused function ([a4e3164](https://github.com/LerianStudio/midaz-console/commit/a4e31647091f2c47139df417ff8128a23d00e669))
* removing My Profile item from dropdown for now ([212f2a5](https://github.com/LerianStudio/midaz-console/commit/212f2a55abc84e5b8e5d74d8b25be4b9e46c05c3))
* use the hook usePopulateForm ([5cd6d39](https://github.com/LerianStudio/midaz-console/commit/5cd6d39b74c136d4733644793adb38eb3c95d7a3))
* use UsersType instead UserResponseDTO ([a2fbf4f](https://github.com/LerianStudio/midaz-console/commit/a2fbf4fb9d4142ac55a67c4120f67739f49dcf41))
* using confirm password error by custom message ([680657e](https://github.com/LerianStudio/midaz-console/commit/680657e58523398e1e8db156e32be6cea36e5826))


### Features

* add password visibility toggle and confirm password in create form ([9d65b11](https://github.com/LerianStudio/midaz-console/commit/9d65b1181a882c683e21a9604b134e7c3dde29e8))
* add the new translations ([952954f](https://github.com/LerianStudio/midaz-console/commit/952954f4fdcdee93f1dc0a5adb53a8db3d34b888))
* add the usage of enforce to display users item ([c62a151](https://github.com/LerianStudio/midaz-console/commit/c62a1513c80142e116e62a2b287dfee4b6d4811e))
* add tooltip and regex to password fields ([bd7a0ce](https://github.com/LerianStudio/midaz-console/commit/bd7a0ce09fd4eb9ec92bc406bcb13a6eb639ef12))
* implement create and delete user ([f154bf5](https://github.com/LerianStudio/midaz-console/commit/f154bf5aa1150a60a55cad78e183fc1dfe02ff93))
* implement edit and reset password by admin ([540db57](https://github.com/LerianStudio/midaz-console/commit/540db577f143bc9e0927772135b973b2ddc770c3))
* implement password update in edit my account ([5af6f34](https://github.com/LerianStudio/midaz-console/commit/5af6f34181d85a9e3fc22f20a5c6ea80cf48fb43))
* prevent users from deleting their own account ([4d18fda](https://github.com/LerianStudio/midaz-console/commit/4d18fdade42d0f768980f1547b699771dc419c6f))
* start to implement user management list and create ([2ae1716](https://github.com/LerianStudio/midaz-console/commit/2ae1716dd95c1377f6d2f72fb00f148c9b6d919d))
* update user management with edit functionality ([3e1df1d](https://github.com/LerianStudio/midaz-console/commit/3e1df1ddafa0a7be7db263497d2c4319d3a87922))

# [1.27.0](https://github.com/LerianStudio/midaz-console/compare/v1.26.3...v1.27.0) (2025-04-10)


### Features

* check file path after to upload files ([94deb61](https://github.com/LerianStudio/midaz-console/commit/94deb6136f5826162109c484af23d310b20d497c))
* check file path after to upload files ([a1e75ec](https://github.com/LerianStudio/midaz-console/commit/a1e75ec3527991dc4c75feeb0ee53eec2078332d))
* check if the folder exists after do upload ([ee9df6b](https://github.com/LerianStudio/midaz-console/commit/ee9df6b1220e4df874c360b96c71d95b72120295))
* check if the folder exists after do upload ([8463f18](https://github.com/LerianStudio/midaz-console/commit/8463f18c4f6e9f30ac3270b51f8c1c626734fdcc))
* check path of save reports ([a195160](https://github.com/LerianStudio/midaz-console/commit/a195160f8458bb161f6943292036bb994b8ff94f))
* check the entire flow ([d6ecc33](https://github.com/LerianStudio/midaz-console/commit/d6ecc33c9dfd9104b4b7c88e564231e352376c80))
* check the entire flow and insert debug steps ([f4be1b0](https://github.com/LerianStudio/midaz-console/commit/f4be1b0c3f7954c4e48c45363d5edee12ba7f462))
* configuration of two types of storage report ([d63a6c6](https://github.com/LerianStudio/midaz-console/commit/d63a6c6f04e823ecbf05fdafe98923f1bccb92cf))
* configure two types of upload ([4d00538](https://github.com/LerianStudio/midaz-console/commit/4d00538033f16250566c981d4162f5a63605ff65))
* create cheking folder path ([8010aa2](https://github.com/LerianStudio/midaz-console/commit/8010aa25887da69a13f51614101ad7771acbd972))
* debug output path ([3e5d567](https://github.com/LerianStudio/midaz-console/commit/3e5d56792bacfa8183dab7a1c3b5140e62944e13))
* debug output path and fix path ([d0cd36d](https://github.com/LerianStudio/midaz-console/commit/d0cd36d366fb9bd53cd0d3cbd31b9daf117b94d8))
* debug output path and fix path again ([82c2f51](https://github.com/LerianStudio/midaz-console/commit/82c2f5163c26929ff6eff1a83047327b829fb758))
* debug output path and fix path using list command ([f56f276](https://github.com/LerianStudio/midaz-console/commit/f56f276056e17de5d3d59842ee74c6f87a67f1c7))
* debug upload of lighthouse reports ([878e5ac](https://github.com/LerianStudio/midaz-console/commit/878e5acbc7a69cc39a27c1d05ac3953b9dddbda3))
* fix file path ([0fa7da7](https://github.com/LerianStudio/midaz-console/commit/0fa7da7481c614c630d7c6189763474564930f11))
* fix file path of lighthouse ci ([f1dfdc0](https://github.com/LerianStudio/midaz-console/commit/f1dfdc0b3373ae85857621bbd6c9cba05dba9a42))
* fix the path of folder ([dd1988c](https://github.com/LerianStudio/midaz-console/commit/dd1988c937bc649af270bd70f7762a9ec276277b))
* fix the path of folder using absolute path ([4e258c3](https://github.com/LerianStudio/midaz-console/commit/4e258c364c82b4d1f66c5562a85fd8d691463d7b))
* generate lighthouse reports ([b828660](https://github.com/LerianStudio/midaz-console/commit/b828660a3ad71d6ccbec4ed3a1bb7c8a5bdf2f84))
* generate report on both types ([5a2f1a4](https://github.com/LerianStudio/midaz-console/commit/5a2f1a441770541742bebd57235bad81fc8558db))
* rebuild lighthouse ci flow ([f84bde4](https://github.com/LerianStudio/midaz-console/commit/f84bde42a952997e9510ad9eb807086597201104))
* upload of lighthouse reports ([030e504](https://github.com/LerianStudio/midaz-console/commit/030e504c757106ebf5021df66f1bd16cf5e812e0))

## [1.26.3](https://github.com/LerianStudio/midaz-console/compare/v1.26.2...v1.26.3) (2025-04-09)


### Bug Fixes

* remove unused import ([4a4f3da](https://github.com/LerianStudio/midaz-console/commit/4a4f3da8931dbbcace85d52156413ca34a2bc7ec))
* setting image avatar in organization switcher ([3344b87](https://github.com/LerianStudio/midaz-console/commit/3344b87d2dce92483a16148d450646b1a3340fd7))
* update type from fetcher ([8ecdc8a](https://github.com/LerianStudio/midaz-console/commit/8ecdc8aecd125754d510922e317069af030058b7))

## [1.26.2](https://github.com/LerianStudio/midaz-console/compare/v1.26.1...v1.26.2) (2025-04-09)


### Bug Fixes

* set file extention default and set public next  environment variable ([fa50c54](https://github.com/LerianStudio/midaz-console/commit/fa50c54780f41633391b2125f4720da68ad181bf))

## [1.26.1](https://github.com/LerianStudio/midaz-console/compare/v1.26.0...v1.26.1) (2025-04-09)


### Bug Fixes

* Added usePopulateForm hook ([f30262e](https://github.com/LerianStudio/midaz-console/commit/f30262e46a4b6af429668bd51a18157749ccd366))
* Package lock ([1720f60](https://github.com/LerianStudio/midaz-console/commit/1720f6009d625c62f3c1478a125bd79cf4017447))

# [1.26.0](https://github.com/LerianStudio/midaz-console/compare/v1.25.2...v1.26.0) (2025-04-09)


### Features

* configure repo activity ([11566c6](https://github.com/LerianStudio/midaz-console/commit/11566c64119166c072f4b2f66fbf761a62e9b3d8))
* fix security vulnerabilities ([ff60af6](https://github.com/LerianStudio/midaz-console/commit/ff60af64397503da466a7e69f6a6f7a06155dd80))
* fix upload-artifact ([611956c](https://github.com/LerianStudio/midaz-console/commit/611956c47614b230e5dd646759aa2c5c999b33ff))
* fix vulnerabilities ([2265a87](https://github.com/LerianStudio/midaz-console/commit/2265a879b87f8e53f4959abf8adce5d04b6fa3b7))
* fix vulnerabilities ([cc52a8d](https://github.com/LerianStudio/midaz-console/commit/cc52a8db7c2376ceb8804df72bbbd09f4a087761))
* increase the lighthouse CI step ([aaf1909](https://github.com/LerianStudio/midaz-console/commit/aaf190997435118d400e52abb3cf63c38d040fdb))
* insert lighthouse on CI flow ([faa3cd8](https://github.com/LerianStudio/midaz-console/commit/faa3cd86ea87037f687c2873934f63d8ce6f269d))
* organize lighthouse-ci ([a9b69f6](https://github.com/LerianStudio/midaz-console/commit/a9b69f62ead89331dc9b72959070bbd19276331e))
* set values to generate only report without broke pipeline ([69fccbf](https://github.com/LerianStudio/midaz-console/commit/69fccbf404176bef5b59b756aaa61a8ff57c857b))

## [1.25.2](https://github.com/LerianStudio/midaz-console/compare/v1.25.1...v1.25.2) (2025-04-09)


### Bug Fixes

* build warning on dynamic api route build generate ([f109b7e](https://github.com/LerianStudio/midaz-console/commit/f109b7e0f53169f5b8764fceccae94d2267976bf))
* include conditional to validate when plugin auth enable on http-fetch-utils-test ([4ff2a05](https://github.com/LerianStudio/midaz-console/commit/4ff2a059d891c71e563a852221d834ba63fdac7f))
* remove unused import ([3f1cc97](https://github.com/LerianStudio/midaz-console/commit/3f1cc97d65190013445f0c86f0fc8a677d48ba78))

## [1.25.1](https://github.com/LerianStudio/midaz-console/compare/v1.25.0...v1.25.1) (2025-04-07)


### Bug Fixes

* Build ([c25ff75](https://github.com/LerianStudio/midaz-console/commit/c25ff75b67257bd076822dd7c7257627ceea8a78))
* Build and audit ([b218235](https://github.com/LerianStudio/midaz-console/commit/b218235ce7ed27d755fa0765a14b0e5b41980b6c))
* Edit Transaction metadata problem with ledger ID ([c3c3c11](https://github.com/LerianStudio/midaz-console/commit/c3c3c1154911932d83fc16dcca41ed608a309128))
* Fixed file name ([e1cab9c](https://github.com/LerianStudio/midaz-console/commit/e1cab9cc3f97a968ecf039ea2d371dc843948dd1))
* Metadata delete key issue ([b3682c2](https://github.com/LerianStudio/midaz-console/commit/b3682c2593f57194268267b93cccd62fe4d29c50))
* Moved Sidebar transactions button ([8a43559](https://github.com/LerianStudio/midaz-console/commit/8a4355922f88b8c5031666ea59e2d0f64010a852))
* otel trace provider test file ([0a663c4](https://github.com/LerianStudio/midaz-console/commit/0a663c4827577e036834019dbc39f5a4794ab987))
* remove unused variable startCustomSpan at httpFetch ([4ec4af8](https://github.com/LerianStudio/midaz-console/commit/4ec4af84e9d527b8b33cf632f48e15456892ed36))
* Small issue on sheet pre populate ([641661b](https://github.com/LerianStudio/midaz-console/commit/641661b182ab8f127759a1fa53d4c5147faded28))
* Small View Transactions refactor ([5f84dd7](https://github.com/LerianStudio/midaz-console/commit/5f84dd70978c840c02fc49984a689624c0695517))
* Test ([b1eed76](https://github.com/LerianStudio/midaz-console/commit/b1eed764aaabc8fb1f1eeb3813286e278f656866))
* update object values to snake_case from camelCase ([433607e](https://github.com/LerianStudio/midaz-console/commit/433607ecd445c8e82377a246a56516f9f68f62ed))

# [1.25.0](https://github.com/LerianStudio/midaz-console/compare/v1.24.2...v1.25.0) (2025-04-01)


### Bug Fixes

* Implemented new routing logic to open sheets ([ca45214](https://github.com/LerianStudio/midaz-console/commit/ca452142b94cca07d6ec25720f2a6c1511933d12))
* Unit Test ([bbbc33d](https://github.com/LerianStudio/midaz-console/commit/bbbc33d80c499bc5eabef3fe70fc071f8b0fc3a8))


### Features

* show alert when no asset exists before account creation ([4ebd96f](https://github.com/LerianStudio/midaz-console/commit/4ebd96f48f201614f2cadf2594b7ccb43ef1a5cd))
* update locales with new translations ([d03de89](https://github.com/LerianStudio/midaz-console/commit/d03de89febe1f8e1299a25db2b01d789d39b53ee))
* Upgrade useCreateUpdateSheet for open on routing ([327267b](https://github.com/LerianStudio/midaz-console/commit/327267bdb12d73a3ba04840ce477149fb8dbea3c))

## [1.24.2](https://github.com/LerianStudio/midaz-console/compare/v1.24.1...v1.24.2) (2025-03-31)


### Bug Fixes

* update source destination asset when transaction asset change value ([ec3cb3a](https://github.com/LerianStudio/midaz-console/commit/ec3cb3a4be8b078a05468a219147a4e5f559f892))

## [1.24.1](https://github.com/LerianStudio/midaz-console/compare/v1.24.0...v1.24.1) (2025-03-24)


### Bug Fixes

* load more items in the ledger selector by client pagination ([c6df525](https://github.com/LerianStudio/midaz-console/commit/c6df52592b1fd678e7046f8f36a4ca1f04d78001))

# [1.24.0](https://github.com/LerianStudio/midaz-console/compare/v1.23.0...v1.24.0) (2025-03-24)


### Bug Fixes

* Changed placeholder name ([bf79a89](https://github.com/LerianStudio/midaz-console/commit/bf79a89405dd3398d182b4e29ca0b4776091b2ec))
* First load on OrganizationProvider ([661c841](https://github.com/LerianStudio/midaz-console/commit/661c8418331f44d22530e139b2afe376e5b80c4d))
* Fixed testing ([a75e405](https://github.com/LerianStudio/midaz-console/commit/a75e4055335dc220047aef3e3930d832a04c3510))
* Removed secrets from env files ([ec55ab5](https://github.com/LerianStudio/midaz-console/commit/ec55ab5d6797e3b6aaacf372dabdb61f7d3939e7))
* Removed unused import ([8c83669](https://github.com/LerianStudio/midaz-console/commit/8c83669b067a3e1fd7d297ff2abbc38d98f66ee0))
* Sheet forms behaviour ([9765f39](https://github.com/LerianStudio/midaz-console/commit/9765f39e7a4fa170a538d3b77357834d481083dd))


### Features

* Blocked external accounts for editing ([e9275d9](https://github.com/LerianStudio/midaz-console/commit/e9275d96e08b199a1c73215a6eafa21f98c79c06))

# [1.23.0](https://github.com/LerianStudio/midaz-console/compare/v1.22.0...v1.23.0) (2025-03-24)


### Bug Fixes

* getStorageObject empty object excpetion ([25ae6d2](https://github.com/LerianStudio/midaz-console/commit/25ae6d2ceef1751ee361f0c583751dfd0f9a6c49))
* include validation with lodash ([c8f664a](https://github.com/LerianStudio/midaz-console/commit/c8f664a8ff4f05d68646ad2e82b4d7c675d62bdc))
* include validation with lodash ([0c65c5d](https://github.com/LerianStudio/midaz-console/commit/0c65c5d1eba101e33ca052abc2de2175ce1f29ed))
* update transaction service name env variable ([d31bd96](https://github.com/LerianStudio/midaz-console/commit/d31bd9683afcc694199a1694d8cf8051a1d7b27c))


### Features

* update lerian-midaz banner image ([edb2a1a](https://github.com/LerianStudio/midaz-console/commit/edb2a1a41d7c17b54e071e4c0cd6f6b41600c548))

# [1.22.0](https://github.com/LerianStudio/midaz-console/compare/v1.21.1...v1.22.0) (2025-03-20)


### Bug Fixes

* change the function name and remove callback ([cef93d0](https://github.com/LerianStudio/midaz-console/commit/cef93d06775287886d397df88fc000b0ed1c235c))
* use 'handle' for internal events and 'on' for child component props ([fd12532](https://github.com/LerianStudio/midaz-console/commit/fd125325f0ded27da76bf3ab6282fa5105e3cfa3))


### Features

* remove EntityBox from assets, segments and transactions ([1b0b433](https://github.com/LerianStudio/midaz-console/commit/1b0b433e3075c8cb439650fb11af115af2b45dd4))

## [1.21.1](https://github.com/LerianStudio/midaz-console/compare/v1.21.0...v1.21.1) (2025-03-20)


### Bug Fixes

* remove emptyResourceExtra translation ([72a5a96](https://github.com/LerianStudio/midaz-console/commit/72a5a96ee8dcd8ebac0884aedaada31e745ed76f))
* remove extra prop from EmptyResource ([52a3f25](https://github.com/LerianStudio/midaz-console/commit/52a3f2584298be0347da0a36c13e93bbef86e674))

# [1.21.0](https://github.com/LerianStudio/midaz-console/compare/v1.20.0...v1.21.0) (2025-03-20)


### Bug Fixes

* Moved file formats to env var ([4525dc1](https://github.com/LerianStudio/midaz-console/commit/4525dc1f2c12f01876ce8f8f9f2bc0ebfc515f81))
* Removed console.error ([7222403](https://github.com/LerianStudio/midaz-console/commit/7222403add186ac196bf3520f1aaa34d02ccf0b0))
* Removed last old HttpException ([8084855](https://github.com/LerianStudio/midaz-console/commit/8084855adbd23280088904f07020ea29ce8e9508))
* Solves PR comments ([09e238e](https://github.com/LerianStudio/midaz-console/commit/09e238e3ea997ff6622033e59a03c6fb0725944c))
* When midaz return a text body ([c177264](https://github.com/LerianStudio/midaz-console/commit/c17726404793f785b45e3d60a4179c4ae2c96af1))


### Features

* Added field validation ([e0e1f96](https://github.com/LerianStudio/midaz-console/commit/e0e1f9619781946eb9a90cf81cea2a91973024c5))
* Added Http Lib ([38d56b1](https://github.com/LerianStudio/midaz-console/commit/38d56b189f01788cec1336f4e9cb939faecf44ea))
* Added more unit tests ([6cdea0e](https://github.com/LerianStudio/midaz-console/commit/6cdea0e1aaee79535c5e4705f0d42c850a0a2852))
* Created helper methods to handle SVGs ([e50aca5](https://github.com/LerianStudio/midaz-console/commit/e50aca5d144bda538a23a1a846bb8448df188b07))
* Exceptions clean up ([ebd0511](https://github.com/LerianStudio/midaz-console/commit/ebd05117fc067aa14981c3e4033d1c23f609d37e))
* Implemented validation ([7e49006](https://github.com/LerianStudio/midaz-console/commit/7e49006fa1080c9e248101b73f355053634803b5))

# [1.20.0](https://github.com/LerianStudio/midaz-console/compare/v1.19.1...v1.20.0) (2025-03-20)


### Bug Fixes

* set PLUGIN_AUTH_ENABLED to false default in environment variables ([fb62b90](https://github.com/LerianStudio/midaz-console/commit/fb62b90c1d3d80565f13fca8025282aa73541622))


### Features

* add breadcrumb in ledgers route ([e7e25c3](https://github.com/LerianStudio/midaz-console/commit/e7e25c388d320f5b90ab467a2654ed415792c470))

## [1.19.1](https://github.com/LerianStudio/midaz-console/compare/v1.19.0...v1.19.1) (2025-03-19)


### Bug Fixes

* add effect to update searchValues and improve setTotal function ([80d9100](https://github.com/LerianStudio/midaz-console/commit/80d91008796c47a8cd9ee7edd438ba8f37a8ebc7))
* remove unnecessary fallback string from SelectItem ([ba28558](https://github.com/LerianStudio/midaz-console/commit/ba28558cfeae4f65893243d2594b6faada3542e9))
* useQuery pagination issue ([43259e8](https://github.com/LerianStudio/midaz-console/commit/43259e8d6849c916dd29108505117fe7c8e72659))

# [1.19.0](https://github.com/LerianStudio/midaz-console/compare/v1.18.0...v1.19.0) (2025-03-18)


### Bug Fixes

* change method string to loggerMiddleware ([6954d62](https://github.com/LerianStudio/midaz-console/commit/6954d6239727e34570aa733419b1922a0465b7a7))
* fix unit tests ([e9e47c2](https://github.com/LerianStudio/midaz-console/commit/e9e47c21eed7aaed60e3e4034dc6393333122589))
* fix update user use case dependency name ([62def6b](https://github.com/LerianStudio/midaz-console/commit/62def6bad9fee8dca80f979f139b5f96a3eebe9d))
* implement log aggregator into auth flow ([71b3d08](https://github.com/LerianStudio/midaz-console/commit/71b3d08593488cd33f12bbdbd9c6881f2f4bc621))
* merge auth integration ([febefbf](https://github.com/LerianStudio/midaz-console/commit/febefbf844b178115e93e183d6f30226b55586f9))
* merge comments appointments ([1c187d8](https://github.com/LerianStudio/midaz-console/commit/1c187d8a8c80535e534b6b8b40f541d9065bd535))
* merge develop ([6193402](https://github.com/LerianStudio/midaz-console/commit/61934023666e8dfde190e0c56e1b931f59467682))
* method logger middleware ([247a83c](https://github.com/LerianStudio/midaz-console/commit/247a83c463e57835088a7d3bc78bb631e38b91ac))
* vulnerability alerts ([dc80f47](https://github.com/LerianStudio/midaz-console/commit/dc80f47018ce20a037d70ab6351855cb5930f7c8))


### Features

* creating next user api route ([f3cf2d1](https://github.com/LerianStudio/midaz-console/commit/f3cf2d14a9ab36fd499ef75ba23440d439f4f00f))
* identity group integration ([e0d8308](https://github.com/LerianStudio/midaz-console/commit/e0d83081ff9b4e6030634ad7e102424ad40a07a0))
* identity reset user password flow integration ([6ae4126](https://github.com/LerianStudio/midaz-console/commit/6ae4126aa7ede70e1cc5e62d510c8d4f38f3a752))
* implementing integration with identity service from repository implementation layer (infrastructure) ([b2b510b](https://github.com/LerianStudio/midaz-console/commit/b2b510bf20fa56ead17e0fc38db52880adf6e826))
* implementing plugin auth enabled variable, remove session verify when plugin auth is not enabled ([d41c8c3](https://github.com/LerianStudio/midaz-console/commit/d41c8c3f0e34d8cbe360a6b60584e2f3ec5ad049))
* permission integration, removing casdoor implementation ([c4bbf40](https://github.com/LerianStudio/midaz-console/commit/c4bbf4071242a2280d578fef98a45d41aa9ad94a))
* user repository created ([2a2d80c](https://github.com/LerianStudio/midaz-console/commit/2a2d80c26c8a6c17f047765607fdbdd468d28d80))

# [1.18.0](https://github.com/LerianStudio/midaz-console/compare/v1.17.1...v1.18.0) (2025-03-14)


### Bug Fixes

* error handling and empty resource render ([5941c5c](https://github.com/LerianStudio/midaz-console/commit/5941c5cac6b22efcdaa4243878ee655cfb8ffb1d))


### Features

* improve readability by extracting private methods ([a63b73e](https://github.com/LerianStudio/midaz-console/commit/a63b73eb31c72066d71e931c32038a69830c8341))
* remove most of nested try-catch and add LogOperation decorator ([22b2d78](https://github.com/LerianStudio/midaz-console/commit/22b2d787982c666a64e91530d3483fa1fd6dc858))

## [1.17.1](https://github.com/LerianStudio/midaz-console/compare/v1.17.0...v1.17.1) (2025-03-13)


### Bug Fixes

* update translation files to use the correct article ([a882e1d](https://github.com/LerianStudio/midaz-console/commit/a882e1dec9cac44aee2b66730ff9eb86835f3715))

# [1.17.0](https://github.com/LerianStudio/midaz-console/compare/v1.16.0...v1.17.0) (2025-03-12)


### Features

* implement ledger edit sheet ([17c4222](https://github.com/LerianStudio/midaz-console/commit/17c42227d7bfa8e68aba7f04731ebb1d44afe82a))
* improve ledger handling and callback pattern ([0af9bf3](https://github.com/LerianStudio/midaz-console/commit/0af9bf3b8ef21c6365b116f7b77e4b1d8dc2a4bc))
* moving invalidation logic into the hook itself ([9faed5c](https://github.com/LerianStudio/midaz-console/commit/9faed5c29fc8ee3af05d806ad8979da44466919b))
* remove ledger details and implement currentLedger refetch ([15d472b](https://github.com/LerianStudio/midaz-console/commit/15d472b1613e035e4608101265b731763843be69))
* replace conditional callback with optional chaining ([1d3984d](https://github.com/LerianStudio/midaz-console/commit/1d3984d96591a38d7059388980a48ddcc8862268))
* update the i18n files ([f41e3eb](https://github.com/LerianStudio/midaz-console/commit/f41e3eb2ebd109924f65024c4c998aa5d5b0c13c))

# [1.16.0](https://github.com/LerianStudio/midaz-console/compare/v1.15.0...v1.16.0) (2025-03-07)


### Features

* move IdTabelCell and MetadataTableCell to components/table ([d96a83b](https://github.com/LerianStudio/midaz-console/commit/d96a83b9adf8ec79898840a8e7bfbe29e359a1be))
* set input type to 'email' only ([7f48cfb](https://github.com/LerianStudio/midaz-console/commit/7f48cfb69eeb412acf904f9e524b5e9eeb27e297))

# [1.15.0](https://github.com/LerianStudio/midaz-console/compare/v1.14.0...v1.15.0) (2025-03-07)


### Bug Fixes

* callback naming from onSucess to onSuccess ([d5c6ca1](https://github.com/LerianStudio/midaz-console/commit/d5c6ca15fe32f950036fe84fbb8b012fa16680df))
* using currentLedger.id context instead params ([7566f83](https://github.com/LerianStudio/midaz-console/commit/7566f83fd53d441ee78e513e975fcee31ab6a692))


### Features

* add new translations and update existing copy ([1ec7c22](https://github.com/LerianStudio/midaz-console/commit/1ec7c227a57621e6a9facb87ec340724eccbddd9))
* add onError and onSuccess toasts for hooks ([3d2d273](https://github.com/LerianStudio/midaz-console/commit/3d2d2736182433405e4b265992ae04eba60ca87e))
* add portfolios route directly in the sidebar ([339c741](https://github.com/LerianStudio/midaz-console/commit/339c741a37e98b11405e1dfcff945575753579b2))
* update types by removing 'I' prefix ([f3b0bb3](https://github.com/LerianStudio/midaz-console/commit/f3b0bb35455331f68b95205b405133a6556034c0))

# [1.14.0](https://github.com/LerianStudio/midaz-console/compare/v1.13.0...v1.14.0) (2025-03-06)


### Bug Fixes

* remove console.log from balance repository ([d785cd1](https://github.com/LerianStudio/midaz-console/commit/d785cd1e640a9d2fed6c99cb2ff9dcbf32986952))


### Features

* Created balance repository ([a238783](https://github.com/LerianStudio/midaz-console/commit/a2387839043c4243a158bb52eaa5b81d88d7c0bb))
* Implemented balances on use cases ([2f02085](https://github.com/LerianStudio/midaz-console/commit/2f020854a817a59bfeb29740b984778a8448ab60))
* integrate accounts in the sidebar ([fb25780](https://github.com/LerianStudio/midaz-console/commit/fb25780027e22e18f40faed5479311f317490aea))
* remove balance update on account creation ([4b925c4](https://github.com/LerianStudio/midaz-console/commit/4b925c4b66d777d481facf4f952b22862d9f45be))
* update handleSubmit and add tooltip for disabled switch ([1250993](https://github.com/LerianStudio/midaz-console/commit/1250993f8dc14fa724e394aebeabe0ea040beb4d))
* Updated required fields on accounts sheet ([103fd6b](https://github.com/LerianStudio/midaz-console/commit/103fd6b84fcaa5ebf299a886303a375a676c6c7b))

# [1.13.0](https://github.com/LerianStudio/midaz-console/compare/v1.12.0...v1.13.0) (2025-03-05)


### Bug Fixes

* audit vulnerabilities ([79f48cf](https://github.com/LerianStudio/midaz-console/commit/79f48cff2e1fc9e697083a5f220cfedeaac9018e))
* build error ([0524ccc](https://github.com/LerianStudio/midaz-console/commit/0524cccad6733fe50e45320a73c3773e7322fd10))
* build erros ([dbff849](https://github.com/LerianStudio/midaz-console/commit/dbff849b22c1d885b1876afdee1cc46232fc0e19))
* http-fetch-utils-test adjusting new instrumentation dependency ([07ac153](https://github.com/LerianStudio/midaz-console/commit/07ac153d32eeaa185488983e4aab4195f8066abd))


### Features

* otel tracer provider to send custom span ([66e10ac](https://github.com/LerianStudio/midaz-console/commit/66e10accfc61fbe40ee88ad442cda2a3275f314a))
* send logs to otel ([7c2c171](https://github.com/LerianStudio/midaz-console/commit/7c2c1712100a720432dd3b1c89819aa6a69eff95))

# [1.12.0](https://github.com/LerianStudio/midaz-console/compare/v1.11.0...v1.12.0) (2025-02-27)


### Features

* integrate segments in the sidebar ([8475d09](https://github.com/LerianStudio/midaz-console/commit/8475d0948bc4ada4a54910669c0b3819ded6e8e5))
* update the intl files ([b46c405](https://github.com/LerianStudio/midaz-console/commit/b46c405b17c29c8f6d07fe0d92fed70b54e66ea1))

# [1.11.0](https://github.com/LerianStudio/midaz-console/compare/v1.10.0...v1.11.0) (2025-02-26)


### Bug Fixes

* put the correct types instead any ([aefe7aa](https://github.com/LerianStudio/midaz-console/commit/aefe7aa134098d49938826fb6f12c9991d717a28))
* removing console.log from assets-data-table ([1bf672d](https://github.com/LerianStudio/midaz-console/commit/1bf672df0a959dccba0822a178dacf321ffa423c))
* wrong article in asset message ([93e8fb6](https://github.com/LerianStudio/midaz-console/commit/93e8fb69395a58dfd354d66cdfbaeb834a33cd2c))


### Features

* add assets route in sidebar and sync with ledger selector ([ee13e4a](https://github.com/LerianStudio/midaz-console/commit/ee13e4a39505918a125514f14919dd71df22b1a9))
* pick ledger id by ledger selector instead path params ([8259d74](https://github.com/LerianStudio/midaz-console/commit/8259d749775a399d11a76d931144584cc6ad325e))
* update the pt intl file ([f5ffaaf](https://github.com/LerianStudio/midaz-console/commit/f5ffaaf21756c252c2b8790df7096dbd18907074))

# [1.10.0](https://github.com/LerianStudio/midaz-console/compare/v1.9.1...v1.10.0) (2025-02-26)


### Bug Fixes

* Adjusted LedgerSelector ([960bd41](https://github.com/LerianStudio/midaz-console/commit/960bd41c3c312357e243386cb72daf19d5a977db))
* update transactions data table to use currentLedger.id from new format ([349cd24](https://github.com/LerianStudio/midaz-console/commit/349cd245bfd6fd87342e38e74b7ca70c46417b3c))


### Features

* Added local storage lib functions ([ab01953](https://github.com/LerianStudio/midaz-console/commit/ab01953ad2182eadef7576c074b858b742fb8ed1))
* Adjustment on onboarding ([5bcd9a5](https://github.com/LerianStudio/midaz-console/commit/5bcd9a570d83398f706d2dd8960dfcc7f0b7e5c7))
* Created hooks for default storage behaviour ([ed6dda0](https://github.com/LerianStudio/midaz-console/commit/ed6dda021a3123e55a22251c659e45f1f805c2ec))
* Updated OrganizationProvider ([78b4411](https://github.com/LerianStudio/midaz-console/commit/78b44110700f153ce4014ae2f7d8d611f439de55))
* Updated transaction port on env file. ([6e05973](https://github.com/LerianStudio/midaz-console/commit/6e05973dc9c4432fb8ad8532f53cadc593889d5d))

## [1.9.1](https://github.com/LerianStudio/midaz-console/compare/v1.9.0...v1.9.1) (2025-02-24)


### Bug Fixes

* http fetch utils unit test ([0da1a49](https://github.com/LerianStudio/midaz-console/commit/0da1a49a6e256319bd4a4eb2d78dbef1f2c7d4b0))
* include status code into midaz reponse log ([9953314](https://github.com/LerianStudio/midaz-console/commit/99533145f3aed166e3b4d2f92974d234ae1e2185))
* update midaz id to x-request-id into midaz requests ([23e56c8](https://github.com/LerianStudio/midaz-console/commit/23e56c8071a1fe3199f46004e9a82cf9f79fab40))

# [1.9.0](https://github.com/LerianStudio/midaz-console/compare/v1.8.0...v1.9.0) (2025-02-21)


### Bug Fixes

* Added zod validation to address ([464f34d](https://github.com/LerianStudio/midaz-console/commit/464f34d8d349f45205189dcb2f88bce6c5281f54))
* Audit ([a4da3d7](https://github.com/LerianStudio/midaz-console/commit/a4da3d7cf1f9516064fc921d51a3c4b1f00f57d0))
* Data preservation between steps ([6e58f9d](https://github.com/LerianStudio/midaz-console/commit/6e58f9d087ba537e146d3d5f8f3327b57552b0a2))
* modal not closing after deleting an organization ([8fcf3be](https://github.com/LerianStudio/midaz-console/commit/8fcf3bee0f8e1d25e7f4d543e7843eae18d9c291))


### Features

* Added translation keys ([b5e23e3](https://github.com/LerianStudio/midaz-console/commit/b5e23e3f6a5a8e4de66bf91bdbb0a2370ad6ab59))
* Adjusted layout setup ([79033db](https://github.com/LerianStudio/midaz-console/commit/79033db3542da0a1b6d3ba015c33f4966561e487))
* Changed applyMiddleware path ([1a075d7](https://github.com/LerianStudio/midaz-console/commit/1a075d7eaa4eb8400a7a3ebd18dcefc62e8b07c5))
* create ledger selector and update navbar ([10d4a9e](https://github.com/LerianStudio/midaz-console/commit/10d4a9eee22c122e54258357108e4fd8fae20b6e))
* Created onboarding endpoints ([5af1ba6](https://github.com/LerianStudio/midaz-console/commit/5af1ba682c10577a1ae92231d33375a3350f3452))
* Created page layout component ([04b5083](https://github.com/LerianStudio/midaz-console/commit/04b5083e24edd871712c17dcfef86fdcc3b6d54a))
* implement 'About Midaz' dialog ([ca2a211](https://github.com/LerianStudio/midaz-console/commit/ca2a2117c87039dbb44dfd2329165a08da177b5f))
* Implemented Form ([5962d9a](https://github.com/LerianStudio/midaz-console/commit/5962d9aa5206837d982801a9dd91019a635aa9c7))
* Implemented helper components ([47f4ae6](https://github.com/LerianStudio/midaz-console/commit/47f4ae6544ecd3bb9fbf14cf87c67cdcdb53ec07))
* Implemented onboarding redirect ([2ff6c35](https://github.com/LerianStudio/midaz-console/commit/2ff6c35dcba5e691f5da6e50330aacf9dbc8320f))
* Merge ([0c25847](https://github.com/LerianStudio/midaz-console/commit/0c25847a41d7e52e9eed61019424a286cd123df9))
* separate AboutMidazDialog to its own file ([dc8ec96](https://github.com/LerianStudio/midaz-console/commit/dc8ec96d473d025b9d0227925adf89a0a1f6674b))
* start the refactor of sidebar and navbar ([0f12195](https://github.com/LerianStudio/midaz-console/commit/0f12195cc7e28bf4145a8a11ac92ce6a2441e605))
* update transactions page to use global ledger selector ([6d80801](https://github.com/LerianStudio/midaz-console/commit/6d80801981acb5ae0a73279e9fa589e76d811e3e))

# [1.8.0](https://github.com/LerianStudio/midaz-console/compare/v1.7.0...v1.8.0) (2025-02-13)


### Features

* disable codeql temporarily to execute entire flow ([abbfac7](https://github.com/LerianStudio/midaz-console/commit/abbfac74da26c83781abffba425f3d6a98ae42cf))

# [1.7.0](https://github.com/LerianStudio/midaz-console/compare/v1.6.1...v1.7.0) (2025-02-13)


### Features

* disable commit lint on flow to execute release on main ([9ae3816](https://github.com/LerianStudio/midaz-console/commit/9ae3816d053ce6b3ced0cdc42f67a920ae884b98))

## [1.6.1](https://github.com/LerianStudio/midaz-console/compare/v1.6.0...v1.6.1) (2025-02-12)


### Bug Fixes

* handling create transaction error ([33cf68a](https://github.com/LerianStudio/midaz-console/commit/33cf68aa7a63ef2861d9ceec71497b2466cb31b5))
* lint errors ([0c9ab4f](https://github.com/LerianStudio/midaz-console/commit/0c9ab4f1a7573f7a4a8ebbffcf52671e41ef076c))
* merge conflicts ([7ffbccf](https://github.com/LerianStudio/midaz-console/commit/7ffbccf94313353bf5d437ba52307d6e6bbb10d5))
* remove logs ([5940d20](https://github.com/LerianStudio/midaz-console/commit/5940d2079f41e43a913b7a8f117f956fb88b327f))
* transaction-mapper unit test ([bea3e00](https://github.com/LerianStudio/midaz-console/commit/bea3e00202a0b6c6e0867b703a02f0d74c0ce4c5))

# [1.6.0](https://github.com/LerianStudio/midaz-console/compare/v1.5.0...v1.6.0) (2025-02-12)


### Features

* avoid injection on commit labelling ([1587788](https://github.com/LerianStudio/midaz-console/commit/158778843bf23fea3e00fd93c04bea78bdb31355))
* control mid versions on releases ([7d16214](https://github.com/LerianStudio/midaz-console/commit/7d1621418fa0a0108a7f541260eb090acf83fb40))
* include regex on mensage flow on commit msg ([b9ce36c](https://github.com/LerianStudio/midaz-console/commit/b9ce36c7ca1986dabb46c086068bd961c7ef0165))
* include regex on mensage flow on commit msg on github ([92a2605](https://github.com/LerianStudio/midaz-console/commit/92a2605791931389ec9fdb6c7090a81098809a06))
* include regex on message flow on commit msg on github ([6003b11](https://github.com/LerianStudio/midaz-console/commit/6003b11bc434b5e53995f7f85189d71444b32137))
* increase the flow of commit labelling ([6df8c86](https://github.com/LerianStudio/midaz-console/commit/6df8c862ec409ef4f6ab9c5683fe2db6569eb061))
* increase the flows on feature, fix and hotfix branches ([7519283](https://github.com/LerianStudio/midaz-console/commit/75192836c354e44d3e0a98b88edaf1c4696341a8))
* insert commitlint on the pipeline workflow ([31dfc3f](https://github.com/LerianStudio/midaz-console/commit/31dfc3f55528911a065f979378b946164020ed36))
* set regex of commit labelling ([1ca37bd](https://github.com/LerianStudio/midaz-console/commit/1ca37bd98efe9f54c07287eb58e6e58100c0b83b))
* set regex of commit labelling ([3b64060](https://github.com/LerianStudio/midaz-console/commit/3b64060d2df7ea6ba66e1df97133d9adfd2285a3))
* set regex of commit labelling flow ([f49bcdc](https://github.com/LerianStudio/midaz-console/commit/f49bcdc1bcd8e31c5526e0f6adc5e63da82611ca))
* set regex of commit labelling flow ([b168262](https://github.com/LerianStudio/midaz-console/commit/b168262d08e6c452a37ebd6c5b3e5fdafea95ed7))
* set regex of commit labelling flow ([55be954](https://github.com/LerianStudio/midaz-console/commit/55be954c6eef7181e74aeaaea7a9bdc26cce6a3f))
* set release channel ([ea62a82](https://github.com/LerianStudio/midaz-console/commit/ea62a825a949ecc2eeea3fcabe6b83027a6489cd))
* set release version of mid versions ([a2f9e7c](https://github.com/LerianStudio/midaz-console/commit/a2f9e7c8fbc4c7a1be8f3a4e9d436ed8fd622616))
* set tagformat of releases ([466dbfb](https://github.com/LerianStudio/midaz-console/commit/466dbfb03df19a80af944ceda22eff5d29b94ffa))
* set the codeql vulnerability ([1949e1d](https://github.com/LerianStudio/midaz-console/commit/1949e1d63fbd5e1d188cd90e243d1e1d14d4abd9))
* set the commit label ([2bfdb21](https://github.com/LerianStudio/midaz-console/commit/2bfdb218941b2edd9fbbaa9cb6f517d5456c364b))
* set the commitlint flow ([33672c1](https://github.com/LerianStudio/midaz-console/commit/33672c12368d26683f9988fff2540da9c5f6653d))
* set the pre-release of workflow ([8e5020b](https://github.com/LerianStudio/midaz-console/commit/8e5020b63b1bff8c5629369a79abe285381bae8a))
* set the release channel ([bf46947](https://github.com/LerianStudio/midaz-console/commit/bf46947a70bb45841e072c5d11260e2320f28bfb))
* set the tagformat on release flow ([fa7b708](https://github.com/LerianStudio/midaz-console/commit/fa7b708decb6d0455c011ec937dade74968f53b3))
* set the types of branch ([2e272c0](https://github.com/LerianStudio/midaz-console/commit/2e272c01052258632579a7b0bcf93575b787b314))
* set the vulnerability tracked on codeql ([0fabfef](https://github.com/LerianStudio/midaz-console/commit/0fabfef85fbf2d228235a698ed7418a9c1abf798))
* set versions of alpha and beta ([8bf73fd](https://github.com/LerianStudio/midaz-console/commit/8bf73fdc499313233e86760c5e7b60fac64dda6e))
* test the build release change of flow ([1aaf866](https://github.com/LerianStudio/midaz-console/commit/1aaf866b68958ec267a974e45b536fed2c67c275))
* test the flow of build release ([fa40382](https://github.com/LerianStudio/midaz-console/commit/fa40382b8e7a5313a4b716fb6937533c3c39c6bb))

# [1.5.0](https://github.com/LerianStudio/midaz-console/compare/v1.4.0...v1.5.0) (2025-02-07)


### Bug Fixes

* delete ledgers behavior remove redirect ([c5e164a](https://github.com/LerianStudio/midaz-console/commit/c5e164aa27cac3b7d26298ac50d0132e9ecd1d70))


### Features

* added button prop ([612b06e](https://github.com/LerianStudio/midaz-console/commit/612b06e42d24aa4b334791355e2f70d982c17613))
* httpfetchmidaz on transaction create route ([b229e01](https://github.com/LerianStudio/midaz-console/commit/b229e01a7e7d4ab387fdb3fac9944970f9e74360))

# [1.4.0](https://github.com/LerianStudio/midaz-console/compare/v1.3.0...v1.4.0) (2025-02-04)


### Features

* added default on component ([a303dc9](https://github.com/LerianStudio/midaz-console/commit/a303dc9dfb4ee18da5de3565aca9eb58d934e29e))
* added display value ([6133132](https://github.com/LerianStudio/midaz-console/commit/6133132c99a3f3fa2ef46baa0c1e0fe69987d9ff))
* added format package json format code and added breadcrumb ([a675606](https://github.com/LerianStudio/midaz-console/commit/a675606e6a637563e22256b175435bb4202bc6b0))
* added logger route ([b39058e](https://github.com/LerianStudio/midaz-console/commit/b39058e892e4122fe9537a2ad18f7b6b04dcb8d6))
* added schema ([bf49307](https://github.com/LerianStudio/midaz-console/commit/bf49307c98ac698cb0a20885eed6ba67bac41ef0))
* ajust yml quote ([076b7c6](https://github.com/LerianStudio/midaz-console/commit/076b7c67ab8a83bce0d78b4fa2702302d6fa48e9))
* cancelled circle icon ([dca8bca](https://github.com/LerianStudio/midaz-console/commit/dca8bcaed912ecc11a0c2b1c2be6386f1bbc20a6))
* component rollback ([881dbe5](https://github.com/LerianStudio/midaz-console/commit/881dbe581130e23af0526661b0004c58c50f6858))
* console log unused ([26ab0ba](https://github.com/LerianStudio/midaz-console/commit/26ab0ba77455cc4423b513ea63930c5953464b79))
* create transaction details structure ([4a20066](https://github.com/LerianStudio/midaz-console/commit/4a20066675ece8f6c99b99806b238455f1957e76))
* i18n translate ([0168a58](https://github.com/LerianStudio/midaz-console/commit/0168a586a207ac830c74654c29838b610a441da9))
* improve component badger and opretaion acordion readyonly ([b7af9ca](https://github.com/LerianStudio/midaz-console/commit/b7af9caf51ca5892efabc8247c976658de0452e0))
* improve update description ([3ee4371](https://github.com/LerianStudio/midaz-console/commit/3ee4371ec6174d0244d0d083e0d735fa3f6dbf7f))
* prettier fixes ([20725e9](https://github.com/LerianStudio/midaz-console/commit/20725e974fb25aaed714c947069eea4200fe9218))
* prettier formater ([d8a6390](https://github.com/LerianStudio/midaz-console/commit/d8a6390b678689ff27ce9f60e6fac6da94636b50))
* refactor transactions code ([5bc86be](https://github.com/LerianStudio/midaz-console/commit/5bc86be4f360eb004d1ea467bf0ca7576ee20895))
* refactoring modal to added pagefooter ([0b312d6](https://github.com/LerianStudio/midaz-console/commit/0b312d69caee788b7a4e3366ae87d2abe4a72be6))
* remove console log ([656155f](https://github.com/LerianStudio/midaz-console/commit/656155fbe91b91f0ab1da21db0632f98874eec55))
* remove pre html tag ([e4efe49](https://github.com/LerianStudio/midaz-console/commit/e4efe494fd6f296670b5569b86fcca52999f2c0b))
* remove readyonly prop ([9e96290](https://github.com/LerianStudio/midaz-console/commit/9e96290ef68c76e143865f9a3c786da86225bd75))
* remove unused code and implement transactions update ([7bbd83e](https://github.com/LerianStudio/midaz-console/commit/7bbd83e29881a253b15ae76f0c65c0400aa9a4d4))
* skeleton component ([5f5d993](https://github.com/LerianStudio/midaz-console/commit/5f5d993cb9412eb1519bd3ff66e9b4018ee494f8))
* update badge component ([e282f2d](https://github.com/LerianStudio/midaz-console/commit/e282f2d1c659277519817de44fab6c548ed45efb))

# [1.3.0](https://github.com/LerianStudio/midaz-console/compare/v1.2.0...v1.3.0) (2025-02-03)


### Bug Fixes

* pr changes ([8171ac1](https://github.com/LerianStudio/midaz-console/commit/8171ac1cb1d2a8ad2c1c79662ac34d4534f17897))
* pr changes ([c4343e9](https://github.com/LerianStudio/midaz-console/commit/c4343e939cb1bc4698d21d87a6454a95fa25bb1c))
* remove console and unused codes ([529b28e](https://github.com/LerianStudio/midaz-console/commit/529b28e865afc59db563934b1b426c607ebb2ed7))

### Features

* added midazhttpauth in all files repositories ([c4778cf](https://github.com/LerianStudio/midaz-console/commit/c4778cf39af4d93acce84e089709465d5bca94c6))
* added midazhttpauth on account repository ([33d49c2](https://github.com/LerianStudio/midaz-console/commit/33d49c20120c4bb60be7bd2aec0e41e7fc0ba584))
* added new logger structure implementation ([66f5a3b](https://github.com/LerianStudio/midaz-console/commit/66f5a3bdb2de59b929482487a3287e861e28990d))
* clean up logger v.0 implementation ([47ca3ed](https://github.com/LerianStudio/midaz-console/commit/47ca3ed2a8b32289329a40fab1905d68507e2a4d))
* comentaries to indicate how implmentation works ([44763fc](https://github.com/LerianStudio/midaz-console/commit/44763fc06ef12172e198d5d38c63b11c94ae6935))
* create container load and remove lazy service ([842aed7](https://github.com/LerianStudio/midaz-console/commit/842aed7a289729293df07fa972f26203b208b433))
* fix build ([95bba8e](https://github.com/LerianStudio/midaz-console/commit/95bba8eb6a3fad98f82c83eefe3897fd2a7712ed))
* fix build ([e138d2a](https://github.com/LerianStudio/midaz-console/commit/e138d2a7bae29a65795a39f6f22ab37163b1f873))
* implement midaz id clearscope ([6a0d8c6](https://github.com/LerianStudio/midaz-console/commit/6a0d8c64f6d0f684f8430f5b6733819f1e1e4f0b))
* implement new httpfetchmidazId on product repository and tests ([891d0a1](https://github.com/LerianStudio/midaz-console/commit/891d0a10bf06e95f6fd77f00f0930877ba73d086))
* improve midaz log lib to improve dev experience ([c23a36d](https://github.com/LerianStudio/midaz-console/commit/c23a36d05221bfc61cc5f8e29efb4693185d08b0))
* improve prettier fixes build ([13869c8](https://github.com/LerianStudio/midaz-console/commit/13869c8c81c03b04f1ddc7a1f5bc35da912e0775))
* merge with develop ([f798a85](https://github.com/LerianStudio/midaz-console/commit/f798a858d30ba099469f7ad0bfa7d11bb985d445))
* portfolio repository ([c11415b](https://github.com/LerianStudio/midaz-console/commit/c11415be2e73669a93dc3a37d801fc4acb344f34))
* remove commentary ([29da4f9](https://github.com/LerianStudio/midaz-console/commit/29da4f9ef93c4f02508eebf1e9ddb7a7d90a3348))
* remove lazy service ([38ee1a4](https://github.com/LerianStudio/midaz-console/commit/38ee1a43d944fb9d75ad35f6bb27a33ec25febb7))
* remove lazy service ([9f0ad3f](https://github.com/LerianStudio/midaz-console/commit/9f0ad3f41805b21650b96a370a42260acbc2ce29))
* remove log commentary ([a82680d](https://github.com/LerianStudio/midaz-console/commit/a82680d149375ab498ad599109b267d7b57caae4))
* remove log-container ([5bb9960](https://github.com/LerianStudio/midaz-console/commit/5bb9960cc3b2e12f82ffd903dc9f6a3f96ea6cec))
* remove unused code ([790eb7e](https://github.com/LerianStudio/midaz-console/commit/790eb7ee9eecb733fb5ee419b2b22d7c5efd34b5))
* remove unused code ([6482610](https://github.com/LerianStudio/midaz-console/commit/6482610fba91859d1709e8f578c186cece520d37))
* remove unused code ([95529df](https://github.com/LerianStudio/midaz-console/commit/95529df1c9827fae8ac1d0998b1c9d7c3d03c5c8))

# [1.2.0](https://github.com/LerianStudio/midaz-console/compare/v1.1.4...v1.2.0) (2025-01-15)

### Features

- set the paths of asset ([4f180c6](https://github.com/LerianStudio/midaz-console/commit/4f180c640a69969295a351a9654507f976f034ae))

## [1.1.4](https://github.com/LerianStudio/midaz-console/compare/v1.1.3...v1.1.4) (2024-12-23)

## [1.1.3](https://github.com/LerianStudio/midaz-console/compare/v1.1.2...v1.1.3) (2024-12-18)

### Bug Fixes

- set the improvement on the right branches ([eba8a36](https://github.com/LerianStudio/midaz-console/commit/eba8a36c5c2af90a021c3193903d64689188dead))

## [1.1.2](https://github.com/LerianStudio/midaz-console/compare/v1.1.1...v1.1.2) (2024-12-18)

### Bug Fixes

- improvement on the build of nodejs and set the flow ([c71a502](https://github.com/LerianStudio/midaz-console/commit/c71a50215f31728b6f732c16e6fa0696c0328f69))

## [1.1.1](https://github.com/LerianStudio/midaz-console/compare/v1.1.0...v1.1.1) (2024-12-18)

### Bug Fixes

- improvement on the build of nodejs ([cb4a6b3](https://github.com/LerianStudio/midaz-console/commit/cb4a6b3daad07782415c7efc49d971d5d8a14b99))

# [1.1.0](https://github.com/LerianStudio/midaz-console/compare/v1.0.4...v1.1.0) (2024-12-17)

### Bug Fixes

- changing the trigger to execute github action WF ([d0be6c4](https://github.com/LerianStudio/midaz-console/commit/d0be6c493b2e3343eeb5bc843bfdd90e8b48e948))
- improve steps to control the github actions workflow ([b23314a](https://github.com/LerianStudio/midaz-console/commit/b23314a2db5b9d35af9fd39d1780e9b89c2a338b))
- persist the value of build tag on entire flow ([3510e8d](https://github.com/LerianStudio/midaz-console/commit/3510e8da5ee40a4ad61bb9a57c527928dc64701c))
- Remove LSF Files (quota exceeded) ([6d4eb28](https://github.com/LerianStudio/midaz-console/commit/6d4eb280f109228c1e0022d7b68b30effb747d86))
- set gitattributes to untrack LFS files ([692dd3d](https://github.com/LerianStudio/midaz-console/commit/692dd3d55b3fa5e742a892b8b19b18ff78ec7fb5))

### Features

- improve the flow to notificate a new releases ([7995ee7](https://github.com/LerianStudio/midaz-console/commit/7995ee70f60460121a6298124a279661ea23baa5))

# [1.1.0](https://github.com/LerianStudio/midaz-console/compare/v1.0.4...v1.1.0) (2024-12-17)

### Bug Fixes

- changing the trigger to execute github action WF ([d0be6c4](https://github.com/LerianStudio/midaz-console/commit/d0be6c493b2e3343eeb5bc843bfdd90e8b48e948))
- improve steps to control the github actions workflow ([b23314a](https://github.com/LerianStudio/midaz-console/commit/b23314a2db5b9d35af9fd39d1780e9b89c2a338b))
- persist the value of build tag on entire flow ([3510e8d](https://github.com/LerianStudio/midaz-console/commit/3510e8da5ee40a4ad61bb9a57c527928dc64701c))
- set gitattributes to untrack LFS files ([692dd3d](https://github.com/LerianStudio/midaz-console/commit/692dd3d55b3fa5e742a892b8b19b18ff78ec7fb5))

### Features

- improve the flow to notificate a new releases ([7995ee7](https://github.com/LerianStudio/midaz-console/commit/7995ee70f60460121a6298124a279661ea23baa5))

## [1.0.5](https://github.com/LerianStudio/midaz-console/compare/v1.0.4...v1.0.5) (2024-12-17)

### Bug Fixes

- changing the trigger to execute github action WF ([d0be6c4](https://github.com/LerianStudio/midaz-console/commit/d0be6c493b2e3343eeb5bc843bfdd90e8b48e948))
- improve steps to control the github actions workflow ([b23314a](https://github.com/LerianStudio/midaz-console/commit/b23314a2db5b9d35af9fd39d1780e9b89c2a338b))
- persist the value of build tag on entire flow ([3510e8d](https://github.com/LerianStudio/midaz-console/commit/3510e8da5ee40a4ad61bb9a57c527928dc64701c))
- set gitattributes to untrack LFS files ([692dd3d](https://github.com/LerianStudio/midaz-console/commit/692dd3d55b3fa5e742a892b8b19b18ff78ec7fb5))

## [1.0.5](https://github.com/LerianStudio/midaz-console/compare/v1.0.4...v1.0.5) (2024-12-17)

### Bug Fixes

- changing the trigger to execute github action WF ([d0be6c4](https://github.com/LerianStudio/midaz-console/commit/d0be6c493b2e3343eeb5bc843bfdd90e8b48e948))
- improve steps to control the github actions workflow ([b23314a](https://github.com/LerianStudio/midaz-console/commit/b23314a2db5b9d35af9fd39d1780e9b89c2a338b))
- persist the value of build tag on entire flow ([3510e8d](https://github.com/LerianStudio/midaz-console/commit/3510e8da5ee40a4ad61bb9a57c527928dc64701c))

## [1.0.5](https://github.com/LerianStudio/midaz-console/compare/v1.0.4...v1.0.5) (2024-12-17)

### Bug Fixes

- changing the trigger to execute github action WF ([d0be6c4](https://github.com/LerianStudio/midaz-console/commit/d0be6c493b2e3343eeb5bc843bfdd90e8b48e948))
- persist the value of build tag on entire flow ([3510e8d](https://github.com/LerianStudio/midaz-console/commit/3510e8da5ee40a4ad61bb9a57c527928dc64701c))

## [1.0.4](https://github.com/LerianStudio/midaz-console/compare/v1.0.3...v1.0.4) (2024-12-16)

### Bug Fixes

- insert output variable structure of tag ([bf0b757](https://github.com/LerianStudio/midaz-console/commit/bf0b757f5da440c8333e63aec3cd679b4b10fb8c))
- insert output variable structure of tag ([dde51cb](https://github.com/LerianStudio/midaz-console/commit/dde51cbded93ba801ca710ac4be3e5ada5dee732))

## [1.0.3](https://github.com/LerianStudio/midaz-console/compare/v1.0.2...v1.0.3) (2024-12-16)

### Bug Fixes

- debug structure of tag ([6e594b2](https://github.com/LerianStudio/midaz-console/commit/6e594b23c86fdfa517105ae098eff62cfd8e5dc8))

## [1.0.2](https://github.com/LerianStudio/midaz-console/compare/v1.0.1...v1.0.2) (2024-12-16)

### Bug Fixes

- validate structure of tag ([36c09f2](https://github.com/LerianStudio/midaz-console/commit/36c09f2bf4c8e407127074ac4524ff0f7071d475))

## [1.0.1](https://github.com/LerianStudio/midaz-console/compare/v1.0.0...v1.0.1) (2024-12-16)

### Bug Fixes

- insert url of git on package.json ([a746f30](https://github.com/LerianStudio/midaz-console/commit/a746f300fc10a3aa95bdc30c2f745d7a4c0be215))
- insert url of repo to detect on release config ([f8d0bce](https://github.com/LerianStudio/midaz-console/commit/f8d0bce8f5069f655f5adf25001512e9790f436a))

# 1.0.0 (2024-12-16)

### Bug Fixes

- add normalizeMetadata func. on CardMetadata ([3743bb8](https://github.com/LerianStudio/midaz-console/commit/3743bb824486e3d612943031b961974db3e0b8dc))
- add scroll to sheet component when necessary ([3475c50](https://github.com/LerianStudio/midaz-console/commit/3475c501ec3b7cbff43a3043c69a44a2aa39630b))
- change activeLink function + delete useless page ([cbc8147](https://github.com/LerianStudio/midaz-console/commit/cbc8147f44b61138d33440fcf5bed163d395db21))
- change onCreate prop to optional ([3434752](https://github.com/LerianStudio/midaz-console/commit/3434752c4201010fddd7223f12f89f9da815112a))
- change request in ledger-details to use env variable ([d2b2066](https://github.com/LerianStudio/midaz-console/commit/d2b2066b9fbf317551f0e300154dee579d658be5))
- change request to /api in ledger-details ([ae701f6](https://github.com/LerianStudio/midaz-console/commit/ae701f6088d1d70068a35444910e8776cf997c66))
- comment ThemeProvider ([4165fea](https://github.com/LerianStudio/midaz-console/commit/4165feaa73fb2837441a89f0bb1b6df2fde4a527))
- comment ThemeProvider for while ([9c8e672](https://github.com/LerianStudio/midaz-console/commit/9c8e67267c99d19196815056b48643ee6846a554))
- create dependency ([b5d229f](https://github.com/LerianStudio/midaz-console/commit/b5d229f3349ef85b95b43ce3b1f870450f72a812))
- error pipeline ([33bd890](https://github.com/LerianStudio/midaz-console/commit/33bd8904ac92a86363b28940bb511a574b38d7f0))
- eslint errors and remove password-input.stories ([038bc76](https://github.com/LerianStudio/midaz-console/commit/038bc76a8bb45abbfd6e982730256dd410abeb09))
- flow the pipeline with distinguish tag ([075ba2f](https://github.com/LerianStudio/midaz-console/commit/075ba2f8c77669d195b46720a2936bc5c3fe2799))
- ignorefile on trivy scan ([8a1840e](https://github.com/LerianStudio/midaz-console/commit/8a1840eaa7b93612ec0d9a1e8e3b552abb2e4388))
- ignorefile on trivy scan ([96bcae1](https://github.com/LerianStudio/midaz-console/commit/96bcae1a3096477b773aa11132d0896146cdb006))
- ignorefile on trivy scan ([c912f0f](https://github.com/LerianStudio/midaz-console/commit/c912f0f3bb4511c6a18aeb8b47ea2000e372d651))
- ignorefile on trivy scan ([cde4270](https://github.com/LerianStudio/midaz-console/commit/cde42703d654129945dfbd26890d9ae1403d5180))
- ignorefile on trivy scan ([9b0b2ee](https://github.com/LerianStudio/midaz-console/commit/9b0b2eede8b4261c396d35cf4a8615cfc48827ab))
- ignorefile on trivy scan ([985ffb9](https://github.com/LerianStudio/midaz-console/commit/985ffb91b1f01f00d1b43b65018fc896e116de5d))
- ignorefile on trivy scan ([059a873](https://github.com/LerianStudio/midaz-console/commit/059a87322763274bd557cf4b67f82c8c357383b4))
- insert badges and icons on commits ([61b570e](https://github.com/LerianStudio/midaz-console/commit/61b570ea188b61649c2606cf4f76b8f50928d0eb))
- insert feature branch condition ([3ea36b7](https://github.com/LerianStudio/midaz-console/commit/3ea36b7b9b2b016690f2858013cfa34548c77af2))
- insert feature branch condition on github action ([82fb1eb](https://github.com/LerianStudio/midaz-console/commit/82fb1ebaebe20cdeaac10e497f70170ab94d4af1))
- ledgers-details form ([32e1660](https://github.com/LerianStudio/midaz-console/commit/32e1660634e26efe2fcc6321e8d79ab7feb605f9))
- merge build and release ([94a5eb3](https://github.com/LerianStudio/midaz-console/commit/94a5eb3f9f77e2b4016d4d3e69eff50f896c8e0b))
- merge build and release and the same workflow ([5f285fa](https://github.com/LerianStudio/midaz-console/commit/5f285faaed76fee4f717fa96f3aa03669004328f))
- ory imports and font from \_app ([0e61d70](https://github.com/LerianStudio/midaz-console/commit/0e61d7057631e35106460b319f98450e832c0081))
- remove output=export of next.config ([02a0625](https://github.com/LerianStudio/midaz-console/commit/02a0625ebb8aa2989cb8f6b052502d56be8c515e))
- remove unused importations from DataTable ([8bd2384](https://github.com/LerianStudio/midaz-console/commit/8bd23845fa0414d347bfcac4b8d58b0e48e3029e))
- removing suffix from input.stories ([af9f1c3](https://github.com/LerianStudio/midaz-console/commit/af9f1c3a4ee0478a889c459032b7568ba3eb5b3e))
- removing toast components by shadcn ([44f4416](https://github.com/LerianStudio/midaz-console/commit/44f44161a65e9023aa59487750cf7a437344b3b0))
- render of division select (legders) ([0842321](https://github.com/LerianStudio/midaz-console/commit/08423219f30d0bc696a87bebfbb84a34fe324078))
- resolving conflicts between package.json and package-lock.json ([af3dca1](https://github.com/LerianStudio/midaz-console/commit/af3dca1e0a2108d3fc7554d9b8792d1f099a01fc))
- set process to generate tag ([553eeb5](https://github.com/LerianStudio/midaz-console/commit/553eeb5373d993d470b85cd51cd950e39518b969))
- set the configuration of semantic-release ([4e8e63e](https://github.com/LerianStudio/midaz-console/commit/4e8e63e7bbac084a7090841cdd97330e24057949))
- set the valid tag on dockerhub image ([4f21cfd](https://github.com/LerianStudio/midaz-console/commit/4f21cfd0258993da77ecb154d6b266115d432e44))
- set the vulnerabilities on midaz-console app ([42a221a](https://github.com/LerianStudio/midaz-console/commit/42a221a65b0afec21537e61ba695f9963a19fa63))
- some eslint errors and function component to arrow function ([c579d3d](https://github.com/LerianStudio/midaz-console/commit/c579d3defca5bcdeb9515831a16d1614791032c5))
- states options when are the prefiled data and readOnly in viewMode ([45f0e36](https://github.com/LerianStudio/midaz-console/commit/45f0e3618e30287efb934b41d014498a2cb6a6c8))
- tag release version ([9f0ec68](https://github.com/LerianStudio/midaz-console/commit/9f0ec688e5c53dcc8ea52c329574a5e8a67995c6))
- test semantic release with no analysis ([73195cc](https://github.com/LerianStudio/midaz-console/commit/73195ccefcb4bab81fdc5599b73cf5e9da2e0c99))
- test the npx semantic release ([6a070ff](https://github.com/LerianStudio/midaz-console/commit/6a070ffa5d707ee7e260c587524d830c9bdf2758))
- the structure of feature branch ([88b471d](https://github.com/LerianStudio/midaz-console/commit/88b471d29d76ab5316ea00417bdd7134d087b423))
- trivy scan adapt flow ([a938c57](https://github.com/LerianStudio/midaz-console/commit/a938c570754a6e3e22ba6dd9893efe923e784aa6))
- tryng to generate new release ([6516cd2](https://github.com/LerianStudio/midaz-console/commit/6516cd21361ee39e29219ea7da99366aacf492d0))
- validate entire flow ([9b91598](https://github.com/LerianStudio/midaz-console/commit/9b91598b3f75e1e19d099ec2f2d0c682e1ca13f9))

### Features

- adapt tab to render a different content ([597d114](https://github.com/LerianStudio/midaz-console/commit/597d114f3220e34cd58f2b82f73e3b0da00f9e24))
- add combobox and avatar inside header ([6441c65](https://github.com/LerianStudio/midaz-console/commit/6441c658f8e2c64b7f3783add6f286a69825c132))
- add DataTable component ([0cce456](https://github.com/LerianStudio/midaz-console/commit/0cce45652d592ba78b4decd41d76d0e0f7a51a2d))
- add e2e test using playwright ([6fb73be](https://github.com/LerianStudio/midaz-console/commit/6fb73be98a1e57021ad8bde6f053d70d095db774))
- add eslint, prettier and prettier plugin for tailwind ([eb193f5](https://github.com/LerianStudio/midaz-console/commit/eb193f557bc3bcb8296c2cfcdc3b85e661a946a0))
- add i18n again ([cf1633b](https://github.com/LerianStudio/midaz-console/commit/cf1633bcb118ef22ddc44a247038022cac9af824))
- add more i18n texts ([75dba8c](https://github.com/LerianStudio/midaz-console/commit/75dba8cccd8d6ac4cd67a1264faf4769545003b5))
- add more i18n texts ([205ceab](https://github.com/LerianStudio/midaz-console/commit/205ceab5a2b6848a2fcfbabab4ff7ad25a26f367))
- added delete ([f4348ab](https://github.com/LerianStudio/midaz-console/commit/f4348abb29f017029bbf7ef5229456ac737cb46c))
- added portfolio form ([9cdb11d](https://github.com/LerianStudio/midaz-console/commit/9cdb11d1f131cd1bbc1a0943b080cf1e6c4b3ac3))
- added refetch when account is updated ([f12f567](https://github.com/LerianStudio/midaz-console/commit/f12f5671104071f47ae12f4f09d62aff0bcf7eaa))
- added skeleton option ([c889281](https://github.com/LerianStudio/midaz-console/commit/c889281bd717454d8f21c3d37329e7f3cde76aec))
- bypass login auth ([9a19a0d](https://github.com/LerianStudio/midaz-console/commit/9a19a0d0d08d5d97cd2385cc76b0c421d007ef82))
- change folder structure ([3a748c5](https://github.com/LerianStudio/midaz-console/commit/3a748c5d77918eab22bcf18ef9948aa5e7ea8886))
- Changed readonly style for input ([b1ba663](https://github.com/LerianStudio/midaz-console/commit/b1ba663a03510d13aafa58744ba92ad9bf863b27))
- changing naming conventions to kebab-case ([92e6df3](https://github.com/LerianStudio/midaz-console/commit/92e6df37617d96a0547f3afea534423296e973e3))
- create and use ledgerDetail client ([f2e2f68](https://github.com/LerianStudio/midaz-console/commit/f2e2f68c240d75b2d98b90ed3b7158e65780c88b))
- create authContext and more things about ory ([131d0ab](https://github.com/LerianStudio/midaz-console/commit/131d0ab75b34ee578373075848d4cde491a4db6a))
- create axios config and change table of ledgers route ([a1fcf55](https://github.com/LerianStudio/midaz-console/commit/a1fcf5514ab2127606715246c8a4f0ad1a601823))
- create CardComponent and initial details data ([72fca08](https://github.com/LerianStudio/midaz-console/commit/72fca081ef1fe5d7edc89ff780b4019f53ba7b07))
- create CardResources and CardChart ([1b81e7b](https://github.com/LerianStudio/midaz-console/commit/1b81e7be17d9841a732c9020440859af40b32fcc))
- create dialog and organize some stuffs ([5c577ad](https://github.com/LerianStudio/midaz-console/commit/5c577ad47dc9b17fc8b36bb4b4d36b9c28ee44b1))
- create empty page, divisions and sheet component ([50dcbdf](https://github.com/LerianStudio/midaz-console/commit/50dcbdff9d1ed0b790ff66f884fa63ab717392be))
- create generic components to PageHeader ([4fdea35](https://github.com/LerianStudio/midaz-console/commit/4fdea3521a02cf3aa72664155cdea3749f972c43))
- create ledgerDetailsView with cards and datas by mocks ([ced9ad8](https://github.com/LerianStudio/midaz-console/commit/ced9ad8d72dec1bd1460e8ec57a9512528d517e9))
- create ledgers page according figma + dialog settings ([900e3a0](https://github.com/LerianStudio/midaz-console/commit/900e3a038264eb86e79d03fba821303a6a678abb))
- create sidebar (style + func.) and start header and content ([a6bd952](https://github.com/LerianStudio/midaz-console/commit/a6bd952bc5c8699fc2186abb85ba1a2c81ce0a9a))
- create sub-component Wrapper to PageHeader component ([7ecf661](https://github.com/LerianStudio/midaz-console/commit/7ecf661d16d3c1db851c6f47d33018a9734d1578))
- create the types of response and org. client ([957dba5](https://github.com/LerianStudio/midaz-console/commit/957dba5ff99bff80f013b1a46bfd35a9f65fdf25))
- create useCustomToast hook and separate some functions ([564fc78](https://github.com/LerianStudio/midaz-console/commit/564fc783a6139b8e951260cae25bc36b3dec7689))
- enable commit labelling ([6846271](https://github.com/LerianStudio/midaz-console/commit/6846271f17c5300a98ee8b1172d69f82fe578879))
- header v0.1 + sidebar v0.3 ([5c60a85](https://github.com/LerianStudio/midaz-console/commit/5c60a851660a624e89f53e13cd25243bf9a78dc6))
- implement ledgers create flow ([47d3a24](https://github.com/LerianStudio/midaz-console/commit/47d3a24d00cfc1089bb1919426f9647cea5c5f71))
- implement useSWR to better requests ([8db1307](https://github.com/LerianStudio/midaz-console/commit/8db1307a913e5f1489f8d142684444f94ed0de62))
- Implemented ComboBox Field. ([9dcc938](https://github.com/LerianStudio/midaz-console/commit/9dcc9383baddf53cd0ad3b25955c52c31c33719d))
- organize routes and create signIn page ([0743809](https://github.com/LerianStudio/midaz-console/commit/074380920a23684bfb25e8870e0c1585e618bad7))
- portfolio form message ([f22c0f3](https://github.com/LerianStudio/midaz-console/commit/f22c0f36fa95fb903cbb6bc458075f0631aee848))
- redesign header ([e016eba](https://github.com/LerianStudio/midaz-console/commit/e016eba4e386d94d48b8769ac9a1344616ea3f03))
- redesign of sidebar 2.0 ([7d72ddf](https://github.com/LerianStudio/midaz-console/commit/7d72ddf162fe754331a49fff54a7ab3653c276af))
- redesign of sidebar, and add palette in tailwind config ([7788db2](https://github.com/LerianStudio/midaz-console/commit/7788db232394a5b49a3b6048f55fbe4e33b1ca22))
- refact sheet component and toast ([51e1057](https://github.com/LerianStudio/midaz-console/commit/51e1057022efa3c25d3419dc4dfaa6d23ee92f1d))
- refact way to render dropdown ([7636177](https://github.com/LerianStudio/midaz-console/commit/7636177e6e93b9d8f13b63d1b78056335193e232))
- remove src/ folder ([e68c5be](https://github.com/LerianStudio/midaz-console/commit/e68c5be6bd8f0ed1f1e64a70ecc0a5c63f325645))
- Rename project to midaz-console ([2d5b1e1](https://github.com/LerianStudio/midaz-console/commit/2d5b1e1c4d257936ac787f591852569507d40a2d))
- some adjustments to try deploy on AWS ([1b3f60a](https://github.com/LerianStudio/midaz-console/commit/1b3f60a512ff0da59406a16b1d824d16fb7c688b))
- some changes in signIn and start to create register page ([416b041](https://github.com/LerianStudio/midaz-console/commit/416b041000fba00236e3123d614d327031dfbfac))
- start to create pageHeader component with variations ([e334565](https://github.com/LerianStudio/midaz-console/commit/e334565afb749e09f48e570b2a90c149ea7a446c))
- upgrade to next14, migrate to app and add i18n routing ([8e67e03](https://github.com/LerianStudio/midaz-console/commit/8e67e033eb0d4ec5de5ec56a715efa8470823f02))
- use react-query to fetch and fix some stuffs ([ff09fb9](https://github.com/LerianStudio/midaz-console/commit/ff09fb9d39ff2c6efa920c48c755c4bd85a4337c))

# [1.1.0-feature-set-email-notification.3](https://github.com/LerianStudio/midaz-console/compare/v1.1.0-feature-set-email-notification.2...v1.1.0-feature-set-email-notification.3) (2024-12-12)

### Bug Fixes

- tryng to generate new release ([6516cd2](https://github.com/LerianStudio/midaz-console/commit/6516cd21361ee39e29219ea7da99366aacf492d0))

# [1.1.0-feature-set-email-notification.2](https://github.com/LerianStudio/midaz-console/compare/v1.1.0-feature-set-email-notification.1...v1.1.0-feature-set-email-notification.2) (2024-12-10)

### Bug Fixes

- insert badges and icons on commits ([61b570e](https://github.com/LerianStudio/midaz-console/commit/61b570ea188b61649c2606cf4f76b8f50928d0eb))

# [1.1.0-feature-set-email-notification.1](https://github.com/LerianStudio/midaz-console/compare/v1.0.8-feature-set-email-notification.5...v1.1.0-feature-set-email-notification.1) (2024-12-10)

### Features

- enable commit labelling ([6846271](https://github.com/LerianStudio/midaz-console/commit/6846271f17c5300a98ee8b1172d69f82fe578879))

## [1.0.8-feature-set-email-notification.5](https://github.com/LerianStudio/midaz-console/compare/v1.0.8-feature-set-email-notification.4...v1.0.8-feature-set-email-notification.5) (2024-12-10)

### Bug Fixes

- set process to generate tag ([553eeb5](https://github.com/LerianStudio/midaz-console/commit/553eeb5373d993d470b85cd51cd950e39518b969))

## [1.0.8-feature-set-email-notification.4](https://github.com/LerianStudio/midaz-console/compare/v1.0.8-feature-set-email-notification.3...v1.0.8-feature-set-email-notification.4) (2024-12-10)

### Bug Fixes

- tag release version ([9f0ec68](https://github.com/LerianStudio/midaz-console/commit/9f0ec688e5c53dcc8ea52c329574a5e8a67995c6))

## [1.0.8-feature-set-email-notification.3](https://github.com/LerianStudio/midaz-console/compare/v1.0.8-feature-set-email-notification.2...v1.0.8-feature-set-email-notification.3) (2024-12-10)

### Bug Fixes

- merge build and release ([94a5eb3](https://github.com/LerianStudio/midaz-console/commit/94a5eb3f9f77e2b4016d4d3e69eff50f896c8e0b))
- merge build and release and the same workflow ([5f285fa](https://github.com/LerianStudio/midaz-console/commit/5f285faaed76fee4f717fa96f3aa03669004328f))

## [1.0.8-feature-set-email-notification.2](https://github.com/LerianStudio/midaz-console/compare/v1.0.8-feature-set-email-notification.1...v1.0.8-feature-set-email-notification.2) (2024-12-09)

### Bug Fixes

- create dependency ([b5d229f](https://github.com/LerianStudio/midaz-console/commit/b5d229f3349ef85b95b43ce3b1f870450f72a812))

## [1.0.8-feature-set-email-notification.1](https://github.com/LerianStudio/midaz-console/compare/v1.0.7...v1.0.8-feature-set-email-notification.1) (2024-12-09)

### Bug Fixes

- test semantic release with no analysis ([73195cc](https://github.com/LerianStudio/midaz-console/commit/73195ccefcb4bab81fdc5599b73cf5e9da2e0c99))
- test the npx semantic release ([6a070ff](https://github.com/LerianStudio/midaz-console/commit/6a070ffa5d707ee7e260c587524d830c9bdf2758))
