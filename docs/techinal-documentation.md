

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Technical Documentation](#technical-documentation)
    - [High-level Design](#high-level-design)
    - [Wireframe Design](#wireframe-design)
    - [API Design Contract (Jikan API)](#api-design-contract-jikan-api)


## Technical Documentation


### High-level Design

![alt text](images/high-level-design.png)


###  Wireframe Design

![alt text](images/wireframes.png)




### API Design Contract (Jikan API)


| Endpoint            | Method | Description                                                | Parameters / Request Body Details                                                                                                                                                      | Response Example       |
| ------------------- | ------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **/anime**          | GET    | Retrieve a list of animes                                  | **Query Parameters:** <br> - `q` (optional: string): Filter posts by query string <br> - `page` (optional: integer): page selection  <br> - `limit` (integer) limit amount per request | Array of anime objects |
| **/anime/:id/full** | GET    | Retrieve a single anime by its ID with full of its details | **Path Parameter:** <br> - `id` (number): ID of the post                                                                                                                               | Single anime object    |

