import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { Product } from "../entity/product";

@InputType()
class ProductInput {
  @Field()
  name!: string;
  @Field()
  quantity!: number;
}

@InputType()
class ProductUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  quantity?: number;
}
@Resolver()
export class ProductResolver {
  //Devuelve a cliente graphql
  @Mutation(() => Product)
  async createdProduct(
    //Retornar un producto
    @Arg("variables", () => ProductInput) variables: ProductInput
  ) {
    const ProductMD = await Product.create(variables);
    return await ProductMD.save();
  }
  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number) {
    await Product.delete(id);
    return true;
  }
  @Mutation(() => Boolean)
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => ProductUpdateInput) fields: ProductUpdateInput
  ) {
    await Product.update({ id }, fields);
    return true;
  }
  //Devuelve
  @Query(() => [Product])
  async products() {
    return Product.find();
  }
}
