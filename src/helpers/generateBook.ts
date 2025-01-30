import seedrandom from 'seedrandom';
import { Faker, de, en, fr } from '@faker-js/faker';
import { Book } from '../interfaces/interface';

const fakerLocales = { en, de, fr };

export default function generateBook(seed: number, pageNumber: number, language: string): Book {
  const rng = seedrandom(`${seed}-${pageNumber}`);
  const faker = new Faker({ locale: [fakerLocales[language] || en] });

  const title = `${faker.word.verb()} ${faker.word.noun()}`;
  const authors = faker.person.fullName();
  const publisher = faker.company.name();
  const isbn = faker.commerce.isbn()

  const reviews = Math.round(faker.number.float({ min: 0, max: 10, fractionDigits: 1 }));
  const likes = Math.round(faker.number.float({ min: 0, max: 10, fractionDigits: 1 }));

  const book: Book = {
    index: pageNumber * 20 + Math.floor(rng() * 20),
    isbn,
    title,
    authors,
    publisher,
    language,
    likes,
    reviews,
    cover: faker.image.urlLoremFlickr(),
    reviewDetails: Array.from({ length: Math.round(reviews) }, () => faker.lorem.sentence()),
  };

  return book;
}