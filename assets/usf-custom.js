// define templates for the General theme


/* Begin theme init code */
/*inc_begin_theme-init*/
window._usfActive = 1;
/*inc_end_theme-init*/
/* End theme init code */


var _usfImageWidths;
function _usfIsNew(day) {
    var dayNow = new Date(Date.now());
    var productDate = new Date(day);
    var distance = dayNow - productDate;
    var isNew = _usfGlobalSettings.product_new_time ? _usfGlobalSettings.product_new_time * 86400 : 86400

    return distance < 86400
}
function _handleWishList(id) { 
    if (!_usfCustomerTags || !_usfCustomerTags.length) return false;
    return _usfCustomerTags.includes(t => t == id)
}
function _handleWishListId(id) {
    if (!_usfCustomerTags || !_usfCustomerTags.length) return id;
    var value = _usfCustomerTags.filter(t => t.includes(id))
    return value.length ? value.join('') : id
}
function _usfGridWrapClass() { 
    if (_usfSectionSettings.prod_per_row == 'prod_col_4') return 'col-lg-3'
    if (_usfSectionSettings.prod_per_row == 'prod_col_3') return 'col-lg-3'
    if (_usfSectionSettings.prod_per_row == 'prod_col_2dot4') return 'col-lg-2dot4'
}
function newIsSoldOut(p) {
    var total = p.variants.reduce((a,c) => {
        //if (c.available === -2147483648) return a
        //else return a+=c.available
        return a+=c.available
    },0)
    return total <= 5 && total>=0
}
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.label"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
`<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = /*inc_begin_search-views*/
`<div class="usf-views">
    <button class="usf-view usf-btn usf-icon usf-icon-grid" :class="{'usf-active': view === 'grid'}" @click.prevent.stop="onGridViewClick"></button>
    <button class="usf-view usf-btn usf-icon usf-icon-list" aria-label="List view" :class="{'usf-active': view === 'list'}" @click.prevent.stop="onListViewClick"></button>
</div>`
/*inc_end_search-views*/;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: /*inc_begin_app*/
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <new-filters class="usf-sr-filters"></new-filters>
    </template>
    <usf-sr></usf-sr>
</div>`
/*inc_end_app*/,

    // search results
    searchResults: `
<div class="usf-sr-container usf-general" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></button>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
         <!--    ` + _usfSearchResultsSortByTpl + ` -->
        </div>
    </div>
  <!--   <div class="usf-sr-config" v-else>
        `+_usfSearchResultsSortByTpl + `
    </div> -->

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>
    <div :class="\'row usf-results usf-clear usf-\' + view">
        <template v-if="0 || loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="p in result.items"><usf-sr-griditem :product="p" :result="result" :key="p.id"></usf-sr-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, usf.utils.encodeHtml(term)) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<div :class="usf.platform.isCollectionPage ? 'js_size_prod col-md-4 col-6 pb-4 trans-product ' + _usfGridWrapClass() : 'col-md-3 col-sm-6 col-6'">
    <div class="usf-sr-product product-item-v1" :product-selector="product.id" :data-usf-pid="product.id">
        <div class="product mb-30 engoj_grid_parent relative">
            <div class="img-product relative usf-sr-product__image-container">
                <div v-if="newIsSoldOut(product)" class="usf-soldout-badge">SOLD OUT</div>
                <div v-else-if="chkProduct(product)" class="usf-preoder-badge">PREORDER</div>
                <!-- product image extra -->
                <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
                <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>

                <div :style="newIsSoldOut(product) ? 'opacity: 0.3' : null">
                    <a :href="productUrl" class="engoj_find_img" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave">
                        <img 
                            style="width: 100%" 
                            :data-src="selectedImageUrl" 
                            :data-hover-src="product.images[1] ? product.images[1].url : null" 
                            :src="_usfLoadingGif" 
                            class="lazyload img-responsive hover-img" 
                            :alt="selectedImage.alt || product.title"
                        />
                    </a>
                </div>
                <!-- label product -->
                <figure
                    v-if="hasDiscount || product.tags.includes('DADWEEK')"
                    style="position: absolute; top: 0; left: 0; background: #E63946; color: #ffffff; padding: 5px 10px; z-index: 10;"
                    class="absolute uppercase label-sale text-center"
                >
                    <template v-if="product.tags.includes('DADWEEK')">-30% OFF</template><template v-else>-{{Math.round((product.compareAtPrice - product.price) * 100 / product.compareAtPrice)}}%</template>
                </figure>                <figure 
                    v-if="_usfIsNew(product.date) && _usfGlobalSettings.show_new_label" 
                    :style="'background: ' + _usfGlobalSettings.new_label_color + ';color: ' + _usfGlobalSettings.new_label_text_color" 
                    class="absolute uppercase label-new text-center"
                    v-html="_usfGlobalSettings.new_label_name"
                >
                </figure>
                <!-- END LABEL -->
                <!-- ICON PRODUCT -->
                <div v-if="!_usfGlobalSettings.enable_catalog_mode" class="product-icon-action">
                    <div class="add-wishlist">
                        <template v-if="_usfCustomerTags">
                            <form v-if="_handleWishList(product.id)" method="post" action="/contact#contact_form" id="contact_form" accept-charset="UTF-8" class="contact-form">
                                <input type="hidden" name="form_type" value="customer">
                                <input type="hidden" name="utf8" value="✓">
                                <input type="hidden" name="contact[email]" :value="_usfCustomerEmail">
                                <input type="hidden" name="contact[tags]" :value="_handleWishListId(product.id)">
                                <button class="box-shadow maxus-product__wishlist engoj_add_to_wishlist inline-block text-center" data-toggle="tooltip" data-placement="top" :data-original-title="_usfGlobalSettings.pia_wishlist_name">  
                                    <i v-if="_usfGlobalSettings.pia_wishlist_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_wishlist_svg"></i>
                                    <i v-else :class="_usfGlobalSettings.pia_wishlist"></i>
                                </button>
                            </form>
                            <a v-else href="/pages/wishlist" class="box-shadow inline-block maxus-product__wishlist added wish text-center" data-toggle="tooltip" data-placement="top" :data-original-title="_usfWishlistAddedTxt">
                                <i v-if="_usfGlobalSettings.pia_wishlist_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_wishlist_svg"></i>
                                <i v-else :class="_usfGlobalSettings.pia_wishlist"></i>
                            </a>
                        </template>

                        <template v-if="!_usfCustomerTags">
                            <a href="/account/login" class="box-shadow  inline-block maxus-product__wishlist wish text-center" data-toggle="tooltip" data-placement="top" :data-original-title="_usfGlobalSettings.pia_wishlist_name">
                                <i v-if="_usfGlobalSettings.pia_wishlist_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_wishlist_svg"></i>
                                <i v-else :class="_usfGlobalSettings.pia_wishlist"></i>
                            </a>
                        </template>
                    </div>

                    <div class="add-to-cart">
                        <a v-if="newIsSoldOut(product)" :href="productUrl" class="inline-block icon-addcart margin_right_10 box-shadow" data-toggle="tooltip" data-placement="top" :data-original-title="_usfGlobalSettings.pia_sold_name">
                            <i v-if="_usfGlobalSettings.pia_sold_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_sold_svg"></i>
                            <i v-else :class="_usfGlobalSettings.pia_sold"></i>
                        </a>
                        <a v-else-if="product.variants.length > 1" :href="productUrl" class="inline-block icon-addcart margin_right_10 box-shadow" data-toggle="tooltip" data-placement="top" :data-original-title="_usfGlobalSettings.pia_selectoption_name">
                            <i v-if="_usfGlobalSettings.pia_selectoption_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_selectoption_svg"></i>
                            <i v-else :class="_usfGlobalSettings.pia_selectoption"></i>
                        </a> 
                        <form v-else method="post" action="/cart/add" enctype="multipart/form-data" class="inline-block icon-addcart margin_right_10 box-shadow"  data-toggle="tooltip" data-placement="top" :data-original-title="_usfGlobalSettings.pia_addcart_name">
                            <input type="hidden" name="id" :value="selectedVariantForPrice.id" />
                            <button type="submit" name="add" class="enj-add-to-cart-btn ">
                            <i v-if="_usfGlobalSettings.pia_addcart_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_addcart_svg"></i>
                            <i v-else :class="_usfGlobalSettings.pia_addcart"></i>
                            </button>
                        </form>
                    </div>

                    <div class="quick-view">
                        <a href="javascript:void(0)" class="engoj_btn_quickview icon-quickview inline-block box-shadow" :data-id="product.urlName" data-toggle="tooltip" data-placement="top" :data-original-title="_usfGlobalSettings.pia_quickview_name">
                            <i v-if="_usfGlobalSettings.pia_quickview_svg" class="fsz-unset" v-html="_usfGlobalSettings.pia_quickview_svg"></i>
                            <i v-else :class="_usfGlobalSettings.pia_quickview"></i>
                        </a>
                    </div>
                </div>
                <!-- END ICON -->
                <div v-if="mt = usf.utils.getMetafield(product, 'engo_countdown_prod', 'countdown_datetime')" class="countdown-timer text-center">
                    <ul data-countdown="countdown-v1" :data-date="mt"></ul>
                </div>
            </div>


            <div class="info-product">
                <span class="shopify-product-reviews-badge" :data-id="product.id"></span>
                <h4 class="des-font capital title-product mb-0 flex">
                    <a :href="productUrl" v-html="product.title"></a>
                </h4>
                <!-- PRICE 
                <p v-if="!_usfGlobalSettings.enable_catalog_mode" class="price-product">
                    <span class="price" v-html="displayDiscountedPrice"></span>
                    <s v-if="hasDiscount" class="price-old" v-html="displayPrice"></s>
                </p> -->
                <usf-custom-price :urlName="product.urlName" :selectedVariantForPrice="selectedVariantForPrice" ></usf-custom-price>
                <!-- END PRODUCT -->

                <!-- THUMBNAIL PRODUCT -->
                <div v-if="product.variants.length > 1" class="d-flex align-items-center image-thumbnail">
                    <usf-swatch :product="product" :productUrl="productUrl"></usf-swatch>
                </div>
                <!-- END THUMBNAIL -->
                <!-- Product review -->
                <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                <!-- Swatch-->
                <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            </div>
        </div>
    </div>
</div>
`,
    // Search result pages
    searchResultsPages: `
<center>
    <ul class="usf-sr-pages">
        <template v-for="e in elements">
            <li v-if="e.type === 'prev'" class="usf-sr-pages__prev"><a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" style="font-size:14px">←</a></li>
            <li v-else-if="e.type === 'dots'" class="usf-sr-pages__dots"><span>...</span></li>
            <li v-else-if="e.type === 'page' && e.current" class="usf-sr-pages__page usf-active"><span>{{e.page}}</span></li>
            <li v-else-if="e.type === 'page' && !e.current" class="usf-sr-pages__page"><a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a></li>
            <li v-else-if="e.type === 'next'" class="usf-sr-pages__next"><a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" style="font-size:14px">→</a></li>
        </template>
    </ul>
</center>
`,
    // List view item
    searchResultsListViewItem: ``
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: /*inc_begin_addtocart-plugin*/
`<form class="usf-add-to-cart" method="POST" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
    <input type="hidden" name="form_type" value="product">
    <input type="hidden" name="utf8" value="✓">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="id" :value="variant.id">
    <usf-choose-options v-if="args.product.variants.length > 1" :loc="usf.settings.translation" :args="args"></usf-choose-options>
    <button v-else-if="!usf.utils.isVariantSoldOut(variant)" type="submit" name="add" class="usf-add-to-cart-btn" :data-product-id="args.product.id" @click.prevent.stop="_usfAddToCart">
        <span class="usf-icon usf-icon-cart"></span>
        <span class="usf-label" v-html="loc.addToCart"></span>
    </button>
</form>`
/*inc_end_addtocart-plugin*/,

    // Preview Plugin
    previewPlugin: /*inc_begin_preview-plugin*/
`<div class="usf-sr-preview" :class="['usf-sr-' + settings.iconPosition]" @click.prevent.stop="onShowModal">
    <span class="usf-icon usf-icon-eye"></span>
</div>`
/*inc_end_preview-plugin*/,

    previewPluginModal: /*inc_begin_preview-modal*/
`<div><div class="usf-backdrop"></div><div class="usf-preview__wrapper usf-zone"><div class="usf-preview__container">
    <div class="usf-preview">
        <!-- Close button -->
        <div class="usf-remove" @click="onClose"></div>

        <!-- Body content -->
        <div class="usf-preview__body">
            <!-- left - images of product -->
            <div class="usf-preview__content-left">
                <!-- Big image -->
                <div class="usf-preview__image-slider">
                    <div type="button" title="Prev" class="usf-preview__image-slider__btn usf-prev usf-icon usf-icon-up" @click="onPrevImage(0)" v-if="showBigImageNav"></div>

                    <div class="usf-preview__image-slider__track">
                        <div v-for="i in images" class="usf-preview__image-wrapper" :class="{'usf-active': image === i}"">
                            <div v-if="image === i" class="usf-preview__image lazyload" :data-bgset="usf.platform.getImageUrl(i.url,1024)" :style="'background-image:url('+usf.platform.getImageUrl(i.url, 1024)+')'"></div>
                            <span class="usf-img-loader"></span>
                        </div>
                    </div>

                    <div type="button" title="Next" class="usf-preview__image-slider__btn usf-next usf-icon usf-icon-up" @click="onNextImage(0)" v-if="showBigImageNav"></div>

                    <ul class="usf-preview__image-slider__dots" v-if="showImageIndices && false">
                        <li :class="{'active':i===image}" v-for="(i,index) in images"  @click="onThumbClick(i)"><button type="button">{{index+1}}</button></li>
                    </ul>
                </div>

                <!-- Thumbnails -->
                <div class="usf-preview__thumbs" v-if="showThumbs">
                    <div class="usf-preview__thumbs-inner">
                        <span v-for="i in images" class="usf-preview__thumb" :class="{'usf-active': image === i}" @click="onThumbClick(i)"></span>
                    </div>
                </div>

                <!-- Badges -->
                <div class="usf-preview__badge usf-preview__badge-sale" v-if="hasDiscount" v-html="loc.sale"></div>
            </div>

            <!-- right - info of the product -->
            <div class="usf-preview__content-right usf-scrollbar">
                <div class="usf-preview__content-summary">
                    <!-- Product title -->
                    <h1 class="usf-preview__title"><a :href="productUrl" v-html="product.title"></a></h1>

                    <!-- Vendor -->
                    <div class="usf-preview__vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

                    <!--Prices -->
                    <div class="usf-preview__price-wrapper" :class="{'price--sold-out': isSoldOut}">
                        <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="usf.utils.getDisplayPrice(selectedVariant.compareAtPrice || selectedVariant.price)"></span>
                        <span v-if="hasDiscount" class="usf-discount" v-html="usf.utils.getDisplayPrice(selectedVariant.price)"></span>

                        <div v-if="false" class="price__badges price__badges--listing">
                            <span class="price__badge price__badge--sale" aria-hidden="true" v-if="hasDiscount && usf.settings.search.showSale">
                                <span v-html="loc.sale"></span>
                            </span>
                            <span class="price__badge price__badge--sold-out" v-if="isSoldOut && usf.settings.search.showSoldOut">
                                <span v-html="loc.soldOut"></span>
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="usf-preview__description" :class="{'usf-with-loader':description===undefined}" v-html="description"></p>

                    <!-- Add to cart form -->
                    <form method="post" enctype="multipart/form-data" :action="usf.platform.addToCartUrl" @submit="_usfAddToCart">
                        <!-- variant ID -->
                        <input type="hidden" name="id" :value="selectedVariant.id" />

                        <!-- Options -->
                        <template v-for="(o,index) in product.options">
                            <usf-preview-modal-option :option="o" :index="index"></usf-preview-modal-option>
                        </template>

                        <!-- add to card button -->
                        <div class="usf-preview__field">                            
                            <div class="usf-flex usf-preview__add-to-cart">
                                <usf-num-input v-model="quantity" name="quantity" :disabled="!hasAvailableVariant" :min="1" :max="available" />
                                <button :title="!hasAvailableVariant ? loc.selectedVariantNotAvailable : ''" :disabled="!hasAvailableVariant" type="submit" name="add" class="usf-add-to-cart-btn" :class="{ 'usf-disabled': !hasAvailableVariant}">
                                    <span class="usf-label" v-html="loc.addToCart"></span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- See details link -->
                    <a class="usf-preview__link" :href="productUrl" v-html="loc.seeFullDetails"></a>
                </div>
            </div>
        </div>
    </div>
</div></div></div>`
/*inc_end_preview-modal*/,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], queryValStr)"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else :key="f.id" v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></span>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<div class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices  
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>-->
        <usf-custom-price :urlName="product.urlName" :selectedVariantForPrice="selectedVariantForPrice" ></usf-custom-price>
    </div>
</div>`
/*inc_end_instantsearch-item*/,
};
function chkProduct(vl){
    if(vl.tags.includes('PREORDER'))
        return true
}
var myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');
var myInit = {
    method: 'GET',
    headers: myHeaders,
};
usf.event.add('init', function() {
    var USFcustomPrice = {
        props: ['urlName', 'selectedVariantForPrice'],
        data() {
            return {
                html: ''
            }
        },
        created() {
            this.fetchkg();
        },
        methods: {
            fetchkg() {
                this.isLoading = true;
                fetch(`/products/${this.urlName}?view=usf-price&variant=${this.selectedVariantForPrice.id}`, myInit).then(res=>{
                    return res.text();
                }
                ).then(data=>{
                    this.html = data;
                }
                ).finally(()=>{
                    this.isLoading = false;
                }
                );
            }
        },
        template: `<div class="price-product"  v-if="html"  v-html="html"></div>`,

    }
    usf.register(USFcustomPrice, null, "usf-custom-price");
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];

    usf.event.add('sr_updated', function() {
        hoverActive && hoverActive()
    });

    var UsfSwatch = {
        props: {
            product: Object,
            productUrl: String,
        },
        data() {
            var colorIndex; 
            var colorOption = this.product.options.find((o, i) => {
                if (o.name == 'Color') {
                    colorIndex = i;
                    return true
                }
            })

            return {
                colorOption: colorOption,
                colorIndex: colorIndex,
            }
        },
        template: `
            <div class="variant-image-group engoj_select_color ">
                <template v-if="colorOption">
                    <span v-for="i in 4" class=" border_thumbnail">
                        <a 
                            class="circle-thumb js_change_border" 
                            :class="{'active': i == 1}"
                            href="javascript:void(0)"
                            :data-engojvariant-img="product.variants[i-1].imageIndex > -1 ? product.images[product.variants[i-1].imageIndex] : null"
                            :style="{'background-size':'cover', 'background-image': 'url(' + product.variants[i-1].imageIndex > -1 ? product.images[product.variants[i-1].imageIndex] : null +')'}"
                        >
                        </a>
                    </span>
                </template>
            </div>
            <div class="more_variant">
                <template v-if="colorOption">
                    <a :href="productUrl" v-html="'+ ' + colorOption.values.length - 4"></a>
                </template>
            </div>
        `
    }
    usf.register(UsfSwatch, null, 'usf-swatch');

    var NewFilter = {
        mixins: [usf.components.Filters],
        template: usf.templates.filters,
        methods: {
            moveFilter() {
                var el = this.$el;
                if (!usf.settings.filters.horz && !usf.isMobile) {
                    var drawerZone = document.querySelector('.filter-to-left .filter_sidebar')
                    if (drawerZone) {
                        var header = drawerZone.querySelector('.filter-header')
                        drawerZone.innerHTML = ''; 
                        drawerZone.appendChild(header);
                        drawerZone.appendChild(el);
                        document.body.classList.add('usf-has-filter-drawer');
                    }
                }else{ 
                    window.usf_container.prepend(el);
                    document.body.classList.remove('usf-has-filter-drawer');
                }
            }
        },
        mounted() { 
            this.$nextTick(function() {
                usf.event.add('mobile_changed', this.moveFilter);
                if (!usf.settings.filters.horz && !usf.isMobile) {
                    this.moveFilter();
                }
                // var t = this;
                // window.addEventListener("resize", function(){
                //     if((document.body.classList.contains('usf-has-filter-drawer') && window.innerWidth < usfWindowWidth) || !document.body.classList.contains('usf-has-filter-drawer') && window.innerWidth >= usfWindowWidth)
                //             t.moveFilter();
                // });

            })
        },
    }
    usf.register(NewFilter, null, 'new-filters');
});