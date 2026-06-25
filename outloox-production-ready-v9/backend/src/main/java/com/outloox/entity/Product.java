package com.outloox.entity;

import com.outloox.util.ProductCatalogMapper;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(nullable = false)
    private int stock;

    @Column(length = 20)
    private String badge;

    @Column(nullable = false)
    private double rating = 4.5;

    @Column(name = "review_count", nullable = false)
    private int reviewCount = 0;

    @Column(name = "colors_data", columnDefinition = "TEXT")
    private String colorsData;

    @Column(name = "sizes_data", columnDefinition = "TEXT")
    private String sizesData;

    @Column(name = "features_data", columnDefinition = "TEXT")
    private String featuresData;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.ACTIVE;

    @PrePersist
    @PreUpdate
    protected void normalizeCatalogFields() {
        if (slug == null || slug.isBlank()) {
            slug = ProductCatalogMapper.slugify(name);
        } else {
            slug = ProductCatalogMapper.slugify(slug);
        }
        badge = ProductCatalogMapper.normalizeBadge(badge);
        originalPrice = ProductCatalogMapper.nullablePrice(originalPrice);
        ProductCatalogMapper.applyDerivedStatus(this);
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public String getColorsData() {
        return colorsData;
    }

    public void setColorsData(String colorsData) {
        this.colorsData = colorsData;
    }

    public String getSizesData() {
        return sizesData;
    }

    public void setSizesData(String sizesData) {
        this.sizesData = sizesData;
    }

    public String getFeaturesData() {
        return featuresData;
    }

    public void setFeaturesData(String featuresData) {
        this.featuresData = featuresData;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
