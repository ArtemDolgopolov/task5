import seedrandom from 'seedrandom';
import { Faker, de, en, fr } from '@faker-js/faker';
import { Book } from '../interfaces/interface';

const fakerLocales = { en, de, fr };

const generateRandomInteger = (value: number, rng: seedrandom.prng): number => {
  const floorValue = Math.floor(value);
  const fraction = value - floorValue;
  return Math.random() < fraction ? floorValue + 1 : floorValue;
};

export default function generateBook(seed: number, pageNumber: number, language: string, avgLikes: number, avgReviews: number): Book {
  const rng = seedrandom(`${seed}-${pageNumber}`);
  const faker = new Faker({ locale: [fakerLocales[language] || en] });

  const title = `${faker.word.verb()} ${faker.word.noun()}`;
  const authors = faker.person.fullName();
  const publisher = faker.company.name();
  const isbn = faker.commerce.isbn();

  const likes = generateRandomInteger(avgLikes, rng);
  const reviews = generateRandomInteger(avgReviews, rng);

  const book: Book = {
    index: pageNumber * 20 + Math.floor(rng() * 20),
    isbn,
    title,
    authors,
    publisher,
    language,
    likes,
    reviews,
    cover: faker.image.urlLoremFlickr({ width: 300, height: 300, category: "abstract" }),
    reviewDetails: Array.from({ length: reviews }, () => faker.lorem.sentence()),
  };

  return book;
}