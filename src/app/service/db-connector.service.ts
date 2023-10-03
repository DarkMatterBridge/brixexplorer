import {Injectable} from '@angular/core';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DbConnectorService {

  supabaseUrl = 'https://zjzultapyefjpwrskxbx.supabase.co'
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqenVsdGFweWVmanB3cnNreGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwNzEzNTEsImV4cCI6MjAxMTY0NzM1MX0.sSsYLy2mqgXRZYFYqZnF6a0Od_ax7pGwa96wat8qtXs'

  private supabase: SupabaseClient

  constructor() {

    this.supabase = createClient(
      this.supabaseUrl,
      this.supabaseKey
      // environment.supabaseUrl,
      // environment.supabaseKey
    );

    this.fetchTodoItems()
  }

  async fetchTodoItems() {

    alert("db call")
    let { data: aab, error } = await this.supabase
      .from('aab')
      .select('id')

    // const {data, error} = await this.supabase.from('todos').select();
    if (error) {
      throw error;
    } else {
      console.log(aab)
    }

  }
}
