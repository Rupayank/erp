import { v4 as uuidv4 } from "uuid";
export interface Employee {
	id: string;
	name: string;
	contact: number;
	email: string;
	level: string;
	managerId?: string;
	supervisor?: string;
}
export class Head implements Employee {
	id: string = uuidv4();
	name: string;
	contact: number;
	email: string;
	level: string;
	constructor(name: string, contact: number, email: string, level: string) {
		this.name = name;
		this.level = level;
		this.contact = contact;
		this.email = email;
	}
	validateEmail(mail: string): boolean {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
		return false;
	}
	validateContact(input: number): boolean {
		var phoneno = /^\d{10}$/;
		let contact = input.toString();
		if (contact.match(phoneno)) return true;
		else return false;
	}
	validateLevel(level: string): boolean {
		let arr = ["Developer", "Tester", "Intern", "Manager", "Programmer"];
		let test = arr.findIndex((type) => type === level);
		if (test >= 0) return true;
		return false;
	}
	validate(input: number, mail: string, level: string): boolean {
		if (
			this.validateContact(input) &&
			this.validateEmail(mail) &&
			this.validateLevel(level)
		)
			return true;
		return false;
	}
}
export class Emp extends Head {
	managerId: string;
	constructor(
		name: string,
		contact: number,
		email: string,
		level: string,
		managerId: string
	) {
		super(name, contact, email, level);
		this.managerId = managerId;
	}
}
