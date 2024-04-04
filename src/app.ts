showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

// Завдання 1: Принцип єдиної відповідальності (SRP)
// Створіть невелику програму, яка моделює бібліотечну систему.
//     Реалізуйте класи для Книги, Бібліотеки та Користувача.
//     Переконайтеся, що кожен клас дотримується принципу єдиної відповідальності.
//     Наприклад, клас Книга повинен бути відповідальним за книжкові деталі,
//     Бібліотека за бібліотечні операції, а Користувач за користувальницькі дані.

enum Genre {
    SCI_FI = 'Science fiction',
    FANTASY = 'Fantasy',
    DOCUMENTARY = 'Documentary',
    ROMANCE = 'Romance',
}

class Book {
    constructor(
        private title: string,
        private author: string,
        private publicationYear: number,
        private genre: Genre
    ) {}

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getPublicationYear(): number {
        return this.publicationYear;
    }

    getGenre(): string {
        return this.genre;
    }
}

class Library {
    constructor(private books: Book[] = []) {
    }

    addBook(book: Book): void {
        this.books = [...this.books, book];
    }

    removeBookByTitle(title: string): void {
        this.books = this.books.filter(book => book.getTitle() !== title);
    }

    findBookByTitle(title: string): Book | undefined {
        return this.books.find(book => book.getTitle() === title);
    }

    getAllBooks(): Book[] {
        return this.books;
    }
}

class User {
    constructor(private name: string, private email: string) {
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    borrowBook(title: string): void {
        console.log(`${this.getName()} borrow ${title} book`);
    }

    returnBook(title: string): void {
        console.log(`${this.getName()} return ${title} book`);
    }
}

//     Завдання 2: Принцип відкритості/закритості (OCP)
// Розробіть простий графічний редактор, який дозволяє користувачам малювати різні форми
// (наприклад, кола, прямокутники, трикутники).
//     Застосуйте принцип відкритості/закритості для зручного розширення для додавання нових форм
// без змінення існуючого коду.
//     Покажіть приклад додавання нової форми (наприклад, еліпса) без модифікації основної
// функціональності малювання.

abstract class SuperShape {
    constructor(protected name: string = 'MainShape') {
    }
    get nameShape(): string {
        return this.name;
    }
    public draw(): void {
        console.log('draws a Shape');
    }
}

class Circle extends SuperShape {
    override draw(): void {
        console.log('draws a Circle');
    }

    additionalMethodForCircle(): void {
        console.log('additional method');
    }
}

class Rectangle extends SuperShape {
    override draw(): void {
        console.log('draws a Rectangle');
    }

    additionalMethodForRectangle(): void {
        console.log('additional method');
    }
}

class Triangle extends SuperShape {
    override draw(): void {
        console.log('draws a Triangle');
    }

    additionalMethodForTriangle(): void {
        console.log('additional method');
    }
}

class Ellipse extends SuperShape {
    override draw(): void {
        console.log('draws a Ellipse');
    }

    additionalMethodForEllipse(): void {
        console.log('additional method');
    }
}

class GraphicEditor {
    getNameShape(shape: SuperShape): string {
        return shape.nameShape;
    }
    drawShape(shape: SuperShape): void {
        shape.draw();
    }
}

const editor = new GraphicEditor();
const ellipse = new Ellipse('newEllipse');
editor.drawShape(ellipse);
console.log(editor.getNameShape(ellipse));

//     Завдання 3: Принцип підстановки Лісков (LSP)
// Створіть ієрархію геометричних фігур з класами, такими як Квадрат, Коло та Трикутник.
//     Застосуйте принцип підстановки Ліскова, переконавшись, що об'єкти базового класу
// (наприклад, Фігура) можуть бути замінені об'єктами похідних класів без впливу на коректність
// програми. Покажіть приклад, де різні форми можуть використовуватися взаємозамінно.

abstract class MainShape {
    abstract area(): number;
}

class MainSquare extends MainShape {
    constructor(private sideLength: number) {
        super();
    }

    area(): number {
        return this.sideLength ** 2;
    }
}

class MainCircle extends MainShape {
    constructor(private radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius ** 2;
    }
}

class MainTriangle extends MainShape {
    constructor(private base: number, private height: number) {
        super();
    }

    area(): number {
        return (this.base * this.height) / 2;
    }
}

function printArea(shape: MainShape): void {
    console.log(`Area of the shape: ${shape.area()}`);
}

const square = new MainSquare(5);
const circle = new MainCircle(3);
const triangle = new MainTriangle(4, 6);

printArea(square);
printArea(circle);
printArea(triangle);


//
//     Завдання 4: Принцип розділення інтерфейсу (ISP)
// Спроектуйте інтерфейс для Системи Управління Завданнями з методами, такими як createTask(),
//     assignTask() та completeTask().
//     Реалізуйте класи для різних типів користувачів (наприклад, Розробник, Менеджер).
//     Застосуйте принцип розділення інтерфейсу, переконавшись, що кожен клас реалізує лише ті методи,
//     які стосуються його ролі.

interface ITaskCreatable {
    createTask(title: string, description: string): void;
}

interface ITaskAssignable {
    assignTask(taskId: number, assignee: string): void;
}

interface ITaskCompletable {
    completeTask(taskId: number): void;
}

class Developer implements ITaskCreatable, ITaskAssignable, ITaskCompletable {
    createTask(title: string, description: string): void {
        console.log(`Developer created a task: ${title}`);
    }

    assignTask(taskId: number, assignee: string): void {
        console.log(`Developer assigned task ${taskId} to ${assignee}`);
    }

    completeTask(taskId: number): void {
        console.log(`Developer completed task ${taskId}`);
    }
}

class Manager implements ITaskCreatable, ITaskAssignable {
    createTask(title: string, description: string): void {
        console.log(`Manager created a task: ${title}`);
    }

    assignTask(taskId: number, assignee: string): void {
        console.log(`Manager assigned task ${taskId} to ${assignee}`);
    }
}

const developer = new Developer();
const manager = new Manager();

developer.createTask('Fix bugs', 'Fix critical bugs in the application');
developer.assignTask(1, 'John Doe');
developer.completeTask(1);

manager.createTask('Review code', 'Review the code changes made in the last sprint');
manager.assignTask(2, 'Jane Smith');
// manager.completeTask(2); Manager cannot complete tasks!!!

//     Завдання 5: Принцип інверсії залежностей (DIP)
// Розробіть систему обміну повідомленнями, де високорівневі модулі відправляють повідомлення
// низькорівневим модулям. Застосуйте принцип інверсії залежностей за допомогою введення залежностей
// або абстракцій, щоб високорівневі модулі залежали від абстракцій, а не від конкретних реалізацій.
//     Продемонструйте, що зміна реалізації обміну повідомленнями не впливає на високорівневі модулі.

interface IMessageSender {
    sendMessage(message: string): void;
}

class MessageReceiver implements IMessageSender {
    sendMessage(message: string): void {
        console.log(`Received message: ${message}`);
    }
}

class HighLevelModule {
    constructor(private messageSender: IMessageSender) {
    }

    sendImportantMessage() {
        this.messageSender.sendMessage('Important message from High Level Module');
    }
}

const messageReceiver = new MessageReceiver();
const highLevelModule = new HighLevelModule(messageReceiver);

highLevelModule.sendImportantMessage();