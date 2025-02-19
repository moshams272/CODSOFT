import {body} from "express-validator"

export const validationUserSchema=()=>{
    return [
        body("firstName")
            .notEmpty()
            .withMessage("First Name is required")
            .isLength({min:3,max:50})
            .withMessage("First Name Length should be in range 3 to 50")
        ,body("lastName")
        .notEmpty()
        .withMessage("Last Name is required")
        .isLength({min:3,max:50})
        .withMessage("Last Name Length should be in range 3 to 50")
     ]
}