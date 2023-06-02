package com.c1se16.user.item;

import com.c1se16.product.Product;
import com.c1se16.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, String> {

    Optional<Item> findByProductAndOwner(Product product, User owner);

    @Query("SELECT i FROM Item i JOIN FETCH i.product JOIN FETCH i.owner WHERE i.id = ?1")
    Optional<Item> findDetailItemById(String id);
}