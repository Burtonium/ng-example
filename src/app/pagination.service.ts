import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, scan, take } from 'rxjs/operators';

interface QueryConfig {
  path: string, //  path to collection
  field: string, // field to orderBy
  limit: number, // limit per query
}

@Injectable()
export class PaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private afs: AngularFirestore) { }

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any) {
    this.query = { 
      path,
      field,
      limit: 10,
      ...opts
    }
    
    const first = this.afs.collection(this.query.path, ref => {
      return ref
              .orderBy(this.query.field, 'desc')
              .limit(this.query.limit)
    })

    this.mapAndUpdate(first)
    
    const byCreationTime = (obj1, obj2) => {
        if (obj1.createdAt < obj2.createdAt) {
            return 1;
        }
    
        if (obj1.createdAt > obj2.createdAt) {
            return -1;
        }
    
        return 0;
    };
    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
        .pipe(scan((acc, val) =>  {
          return acc.concat(val).sort(byCreationTime);
        }))
  }

 
  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor()

    const more = this.afs.collection(this.query.path, ref => {
      return ref
              .orderBy(this.query.field, 'desc')
              .limit(this.query.limit)
              .startAfter(cursor)
    })
    this.mapAndUpdate(more)
  }
  
  loadNew() {
    const more = this.afs.collection(this.query.path, ref => {
      return ref
              .orderBy(this.query.field, 'desc')
              .limit(1)
    })
    this.mapAndUpdate(more);
  }


  // Determines the doc snapshot to paginate query 
  private getCursor() {
    const current = this._data.value
    return current.length ? current[current.length - 1].doc : null;
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) { return };

    this._loading.next(true)
    
    const mapSnapshotWithDocRef = arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { ...data, doc }
        })
        
        // update source with new values, done loading
        this._data.next(values)
        this._loading.next(false)

        // no more values, mark done
        if (!values.length) {
          this._done.next(true)
        }
    }
    
    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .pipe(tap(mapSnapshotWithDocRef), take(1))
      .subscribe()
  }
}