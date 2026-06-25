package com.outloox.repository;

import com.outloox.entity.Category;
import com.outloox.entity.Product;
import com.outloox.entity.Status;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByCategory(Category category);

    List<Product> findByCategory_CategoryNameIgnoreCaseAndStatusNot(String categoryName, Status status);

    List<Product> findByStatusNot(Status status);

    Optional<Product> findBySlugIgnoreCase(String slug);

    boolean existsBySlug(String slug);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.productId = :productId")
    Optional<Product> findByIdForUpdate(@Param("productId") Integer productId);
}
