import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  gallery: HTMLElement | null | undefined;
  carouselItems: NodeListOf<Element> | null | undefined;
  prevButton: HTMLElement | null | undefined;
  nextButton: HTMLElement | null | undefined;
  currentIndex = 0;
  ngOnInit() {
    this.gallery = document.getElementById('gallery');
    this.carouselItems = this.gallery?.querySelectorAll('[data-carousel-item]');
    this.prevButton = this.gallery?.querySelector('[data-carousel-prev]');
    this.nextButton = this.gallery?.querySelector('[data-carousel-next]');

    this.prevButton?.addEventListener('click', this.prevItem.bind(this));
    this.nextButton?.addEventListener('click', this.nextItem.bind(this));

    this.updateCarousel();
  }

  updateCarousel() {
    this.carouselItems?.forEach((item, index) => {
      if (index === this.currentIndex) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
  prevItem() {
    this.currentIndex = (this.currentIndex - 1 + (this.carouselItems?.length || 0)) % (this.carouselItems?.length || 1);
    this.updateCarousel();
  }
  nextItem() {
    this.currentIndex = (this.currentIndex + 1) % (this.carouselItems?.length || 1);
    this.updateCarousel();
  }
}
