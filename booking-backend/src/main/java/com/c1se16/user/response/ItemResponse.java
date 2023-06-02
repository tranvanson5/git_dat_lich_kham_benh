package com.c1se16.user.response;

import com.c1se16.product.response.ProductSearchResponse;
import com.c1se16.user.UserDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ItemResponse extends ProductSearchResponse {

    private String itemId;

    private Integer quantity;
    private UserDTO owner;
}
