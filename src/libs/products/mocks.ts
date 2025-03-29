import { faker } from '@faker-js/faker';
import {
  ProductAttribute,
  ProductCategoryNode,
  ProductDetail,
  ProductPreview,
  ProductSummary,
  ProductType,
  ProductVariant,
} from './types';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { generateMockReviewPreview } from '@/libs/reviews/mocks';

export function generateMockProductPreview(id: number): ProductPreview {
  return {
    id,
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName()),
    price: Number(faker.commerce.price({ min: 10, max: 500 })),
    image: {
      url: faker.image.url(),
      alt: faker.commerce.productAdjective(),
      width: 600,
      height: 400,
    },
  };
}

export function generateMockProductSummary(id: number): ProductSummary {
  return {
    ...generateMockProductPreview(id),
    productType: faker.helpers.arrayElement(Object.values(ProductType)),
    store: generateMockStorePreview(),
  };
}

export function generateMockProductDetail(id: number): ProductDetail {
  const productType = faker.helpers.arrayElement(Object.values(ProductType));
  return {
    ...generateMockProductSummary(id),
    description: faker.commerce.productDescription(),
    attributes: Array.from(
      { length: 3 },
      (_, i): ProductAttribute => ({
        id: i + 1,
        attributeName: faker.commerce.productAdjective(),
        attributeValue: faker.commerce.productMaterial(),
      }),
    ),
    variants: Array.from(
      { length: 2 },
      (_, i): ProductVariant => ({
        id: i + 1,
        variantName: faker.color.human(),
        variantValue: faker.commerce.product(),
        additionalPrice: Number(faker.commerce.price({ min: 1, max: 20 })),
      }),
    ),
    categoryId: faker.number.int(),
    categoryPath: [
      {
        id: faker.number.int(),
        name: faker.commerce.department(),
        slug: faker.helpers.slugify(faker.commerce.department()),
      },
      {
        id: faker.number.int(),
        name: faker.commerce.productAdjective(),
        slug: faker.helpers.slugify(faker.commerce.productAdjective()),
      },
    ],
    stock: faker.number.int({ min: 0, max: 100 }),
    downloadLink: productType === 'digital' ? faker.internet.url() : undefined,
    reviews: [generateMockReviewPreview(id), generateMockReviewPreview(id + 1)],
    createdAt: faker.date.past(),
  };
}

let categoryIdCounter = 1;

export function generateMockCategoryTree(count: number = 8): ProductCategoryNode[] {
  const tree: ProductCategoryNode[] = [];

  for (let i = 0; i < count; i++) {
    const parentId = categoryIdCounter++;
    const parent: ProductCategoryNode = {
      id: parentId,
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
      level: 0,
      children: [],
    };

    const subcategoryCount = faker.number.int({ min: 2, max: 4 });
    for (let j = 0; j < subcategoryCount; j++) {
      const childId = categoryIdCounter++;
      const child: ProductCategoryNode = {
        id: childId,
        name: faker.commerce.product(),
        slug: faker.helpers.slugify(faker.commerce.product()).toLowerCase(),
        level: 1,
        parentId: parent.id,
        children: [],
      };

      const subSubCount = faker.number.int({ min: 1, max: 3 });
      for (let k = 0; k < subSubCount; k++) {
        const subChildId = categoryIdCounter++;
        const subChild: ProductCategoryNode = {
          id: subChildId,
          name: faker.commerce.productAdjective(),
          slug: faker.helpers.slugify(faker.commerce.productAdjective()).toLowerCase(),
          level: 2,
          parentId: child.id,
        };
        child.children?.push(subChild);
      }

      parent.children?.push(child);
    }

    tree.push(parent);
  }

  return tree;
}
