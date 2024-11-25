class Product {
    constructor(product_id, product_name, product_description,organization_id, price, quantity, product_image, status) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_description = product_description;
        this.organization_id = organization_id;
        this.price = price;
        this.quantity = quantity;
        this.product_image = product_image;
        this.status = status;
    }

    getProductId() {
        return this.product_id;
    }

    setProductId(product_id) {
        this.product_id = product_id;
    }

    getProductName() {
        return this.product_name;
    }

    setProductName(product_name) {
        this.product_name = product_name;
    }

    getProductDescription() {
        return this.product_description;
    }

    setProductDescription(product_description) {
        this.product_description = product_description;
    }

    getOrganizationId() {
        return this.organization_id;
    }

    setOrganizationId(organization_id) {
        this.organization_id = organization_id;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    getProductImage() {
        return this.product_image;
    }

    setProductImage(product_image) {
        this.product_image = product_image;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
}
