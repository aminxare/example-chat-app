# Readme for Sequelize Cart Model

This is a Sequelize model for a table that can be used in a Node.js application with a database supported by Sequelize ORM.

## Dependencies

This model depends on the following packages:

- `sequelize`: Sequelize is a promise-based ORM for Node.js v10 and later.
- `sequelize-typescript`: Sequelize TypeScript is a package that adds support for TypeScript to Sequelize.

## Usage

1. Import the necessary dependencies:

```typescript
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
```

2. Create a model:

```typescript
let Cart: ModelStatic<Model<any, any>>;
```

3. Define the schema for the cart table:

```typescript
export const schema = Object.freeze({
  tableName: "cart",
  table: {
    // sequelize attributes are defined here
  },
  options: {
    // Other model options go here
    // etc. scopes
  },
});
```

4. Define the priority for this table:

    If the tables should be created in order, set the "priority" value.

    For example if table has foreign key, the refrence table have to be created first

```typescript
export const priority = 2;
```

5. Define the `afterDefine` function to set the `Cart` model:

```typescript
export const afterDefine = (model: ModelStatic<Model<any, any>>) =>{
    // logic that should be run after define models goes here
    // etc. addHooks
  }
```

6. Define the `cart` function to return the `Cart` model:

```typescript
const cart = () => Cart;
export default cart;
```

7. Use the `cart` function to interact with the `Cart` model:

```typescript
const CartModel = cart();

// Example usage:
CartModel.findAll().then((carts) => console.log(carts));
```

## License

This code is released under the MIT license.
