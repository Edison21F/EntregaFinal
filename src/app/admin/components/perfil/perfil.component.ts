import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  images = [
    { src: 'https://i.blogs.es/0ca9a6/aa/1366_2000.jpeg', alt: 'Imagen 1' },
    { src: 'https://media.es.wired.com/photos/6501e7429fa9000811a95fe8/16:9/w_2560%2Cc_limit/Adobe%2520Firefly.jpeg', alt: 'Imagen 2' },
    { src: 'https://media.es.wired.com/photos/650b2a2e72d73ca3bd5ef0cc/16:9/w_2560%2Cc_limit/Business-OpenAI-Dall-E-3-heart.jpg', alt: 'Imagen 3' }
  ];

  cards = [
    {
      title: 'Servicios Personalizados',
      description: 'Descubre nuestros servicios diseñados para ti.',
      icon: 'pi pi-cog'
    },
    {
      title: 'Atención al Cliente',
      description: 'Estamos aquí para ayudarte en todo momento.',
      icon: 'pi pi-users'
    },
    {
      title: 'Calidad Garantizada',
      description: 'Nos esforzamos por ofrecerte lo mejor.',
      icon: 'pi pi-check-circle'
    }
  ];
}
