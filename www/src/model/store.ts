import { Model } from "./model"
import { Observable, Observer } from "rx"

import { School } from "./school/school"

let state = new Model()

class Store {
    observers: Observer<Model>[] = []

    observable:Observable<Model> = Observable.create(observer => this.observers.push(observer))

    set schools(schools: School[]) {
        state = {...state, schools}
        this._next()
        
    }
    set currentSchoolId(id: number) {
        state = {...state, currentSchoolId: id}
        this._next()
    }
    get state() {
        return state
    }
    get model(): Observable<Model> {
        return this.observable
    }
    _next() {
        this.observers.forEach(observer => observer.onNext(state))
    }
}
export default new Store()

