import { Component, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 class="text-3xl font-bold mb-6">{{ title() }}</h1>

      @if (!token()) {
        <a
          href="https://my-test-flax.vercel.app/google"
          class="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          Sign in with Google
        </a>
      } @else {
        <div class="bg-gray-800 p-6 rounded-2xl shadow-xl w-80 text-center">
          <p class="mb-4 text-green-400 font-semibold">Login Successful ✅</p>
          <p><strong>Email:</strong> {{ email() }}</p>
          <p class="mt-2"><strong>Token:</strong></p>
          <p class="text-xs break-all text-gray-300">{{ token() }}</p>
        </div>
      }
    </div>
  `,
})
export class App implements OnInit {
  protected readonly title = signal('my-test-angular');
  protected readonly token = signal<string | null>(null);
  protected readonly email = signal<string | null>(null);

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (token && email) {
      this.token.set(token);
      this.email.set(email);
    }
  }
}
