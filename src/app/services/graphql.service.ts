import { Injectable, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Continent, Country } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  continents: Continent[] = []
  loading: boolean = true

  constructor(private apollo: Apollo) {
    this.getContinents()
  }

  getContinents() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            continents {
              name
              code
              countries {
                code
                name
                languages {
                  code
                  name
                }
                states {
                  code
                  name
                  country {
                    name
                  }
                }
                continent {
                  code
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.continents = result?.data?.continents;
        this.loading = false

        console.log(this.continents);

      });
  }

  fillCountries() { }
}
