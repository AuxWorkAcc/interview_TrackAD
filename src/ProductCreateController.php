<?php

class ProductCreateController extends AbstractController
{
    /**
     * @Route("/products/create", name="product_create", methods={"POST"})
     */
    public function create(Request $request): Response
    {


        //  Requirements for the backend API for products creation (Starting line.)

        // 1. Body of request (JSON) acepted by API must be:

            // {
            //     "name": "<Product Name>",
            //     "price": "<Product Price>",
            //     "description": "<Product Description>"
            // }

        // 2. Upon successful creation of the product, we already have redirect in ProductCreateController.php

        // 3. The API should implement authentication and input sanitization, if there is an error of some sort (database err.,
        //    validation, wrong token, etc.) the API should return an appropriate HTTP status code (4XX/5XX) and an error message in 
        //    the response body.

        //  Requirements for the backend API for products creation (Ending line.)



        // Logic to handle the creation of a product
        // ...

        return $this->redirectToRoute('product_list');
    }
}
