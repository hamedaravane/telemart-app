import { faker } from '@faker-js/faker';
import { UserPrivateProfile, UserPublicPreview, UserRole, UserSummary } from './types';
import { generateMockAddress } from '@/libs/location/mocks';
import { generateMockStorePreview } from '@/libs/stores/mocks';
import { generateMockOrderSummary } from '@/libs/orders/mocks';

export async function generateMockUserPublicPreview(): Promise<UserPublicPreview> {
  return {
    id: faker.number.int(),
    username: faker.internet.username(),
    handle: faker.helpers.slugify(faker.internet.username()),
    photo: {
      url: faker.image.personPortrait(),
    },
  };
}

export async function generateMockUserSummary(): Promise<UserSummary> {
  return {
    ...(await generateMockUserPublicPreview()),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    role: faker.helpers.arrayElement(Object.values(UserRole)),
    address: generateMockAddress(),
  };
}

export async function generateMockUserPrivateProfile(): Promise<UserPrivateProfile> {
  return {
    ...(await generateMockUserSummary()),
    telegramId: faker.string.alphanumeric(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    walletAddress: faker.finance.ethereumAddress(),
    stores: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      generateMockStorePreview(),
    ),
    orders: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      generateMockOrderSummary(),
    ),
  };
}
