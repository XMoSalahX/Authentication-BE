'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">auth-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' :
                                            'id="xs-controllers-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' :
                                        'id="xs-injectables-links-module-AppModule-6aa82787f663b103d6fc5e66f9ccc6a8225ae14c86ab18bc8ee1ed0b0e308e879f9a9ea2410c0e5876d660095d2bab2fff5b7afee551d2f5bc2c6f59e7d36ded"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' :
                                            'id="xs-controllers-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' :
                                        'id="xs-injectables-links-module-AuthModule-95c84e8aaaad4c21843eb940db4b7eed9a86fabda695dec94bbea366413fdeb97298740e96e093469c0b9b84671d37d347fd18ffeb1b79c79a0ee1275aa857c7"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CacheModule.html" data-type="entity-link" >CacheModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' : 'data-bs-target="#xs-controllers-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' :
                                            'id="xs-controllers-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' }>
                                            <li class="link">
                                                <a href="controllers/CacheController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' : 'data-bs-target="#xs-injectables-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' :
                                        'id="xs-injectables-links-module-CacheModule-36063494209c1f7a788aec68a18a444bca4d60d7b53cc375878b3d5b6f3ad419924c57ef103a458ad7d6ed098db88250d14770f8512824c216287fa67c150b97"' }>
                                        <li class="link">
                                            <a href="injectables/CacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-111b29c501305d4674808851027526d1008185e743a9b3863c5231c5e190eb3a3264c1bcdf154bdd83e4e716775744190f35acdd0bf8013d60b109040b0a078d"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-111b29c501305d4674808851027526d1008185e743a9b3863c5231c5e190eb3a3264c1bcdf154bdd83e4e716775744190f35acdd0bf8013d60b109040b0a078d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-111b29c501305d4674808851027526d1008185e743a9b3863c5231c5e190eb3a3264c1bcdf154bdd83e4e716775744190f35acdd0bf8013d60b109040b0a078d"' :
                                        'id="xs-injectables-links-module-DatabaseModule-111b29c501305d4674808851027526d1008185e743a9b3863c5231c5e190eb3a3264c1bcdf154bdd83e4e716775744190f35acdd0bf8013d60b109040b0a078d"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailerModule.html" data-type="entity-link" >MailerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' : 'data-bs-target="#xs-controllers-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' :
                                            'id="xs-controllers-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' }>
                                            <li class="link">
                                                <a href="controllers/MailerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' : 'data-bs-target="#xs-injectables-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' :
                                        'id="xs-injectables-links-module-MailerModule-97746d80085632d1cbd8a9aa5fc9efc1eef338c763c2fcaf8d1e79c374ad861672a94f66b81349facff8313bd83f0f5f02e946d79ce804c0b749c5c468acb9f7"' }>
                                        <li class="link">
                                            <a href="injectables/MailerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' :
                                            'id="xs-controllers-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' :
                                        'id="xs-injectables-links-module-UsersModule-a13448d2b3caa9c42841b180900cb57c933d81e7bc382ce5ddb3aa3cde2eca5424f03c003829f2f672e5e94b47ef9a922e8b100575a796377fad4afaa7160f7c"' }>
                                        <li class="link">
                                            <a href="injectables/UsersRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CacheController.html" data-type="entity-link" >CacheController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailerController.html" data-type="entity-link" >MailerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseAbstractRepository.html" data-type="entity-link" >BaseAbstractRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseResponse.html" data-type="entity-link" >BaseResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cache.html" data-type="entity-link" >Cache</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCacheDto.html" data-type="entity-link" >CreateCacheDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtHeaders.html" data-type="entity-link" >JwtHeaders</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/RejectEmptyValuesPipe.html" data-type="entity-link" >RejectEmptyValuesPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequireTogetherConstraint.html" data-type="entity-link" >RequireTogetherConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemControlValidationDto.html" data-type="entity-link" >SystemControlValidationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemControlValidationDto-1.html" data-type="entity-link" >SystemControlValidationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SystemControlValidationSignInDto.html" data-type="entity-link" >SystemControlValidationSignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UniqueKeysConstraint.html" data-type="entity-link" >UniqueKeysConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCacheDto.html" data-type="entity-link" >UpdateCacheDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailDto.html" data-type="entity-link" >VerifyEmailDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CacheService.html" data-type="entity-link" >CacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CorsMiddleware.html" data-type="entity-link" >CorsMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailerService.html" data-type="entity-link" >MailerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SwaggerAuthMiddleware.html" data-type="entity-link" >SwaggerAuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersRepository.html" data-type="entity-link" >UsersRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/HeaderValidationGuard.html" data-type="entity-link" >HeaderValidationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/JWTAuthGuard.html" data-type="entity-link" >JWTAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/JWTDecodedAuthGuard.html" data-type="entity-link" >JWTDecodedAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IDecodedCsrf.html" data-type="entity-link" >IDecodedCsrf</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRequestWithUser.html" data-type="entity-link" >IRequestWithUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});