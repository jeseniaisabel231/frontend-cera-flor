import {
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { Vibrant } from 'node-vibrant/browser';

@Component({
  selector: 'app-recolor-image',
  template: `
    <canvas #canvas class="h-32 w-32 object-contain"></canvas>
  `,
})
export class RecolorImageComponent implements OnChanges {
  public src = input.required<string>(); // URL de la imagen
  public fill = input<any>(); // Color a aplicar
  public canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas'); // Referencia al canvas

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.src()) return;
    this.applyColor();
  }
  private async applyColor() {
    const canvas = this.canvasRef()?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.src();

    await new Promise((resolve) => (img.onload = resolve));

    // Ajusta el tamaño del canvas a la imagen
    if (canvas) {
      canvas.width = img.width;
      canvas.height = img.height;
      // Dibuja la imagen original
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // Convierte el color hex a RGB
      const vibrant = new Vibrant(this.fill());
      const palette = await vibrant.getPalette();
      const color = palette.Vibrant?.hex || '#000000';
      const rgb = this.hexToRgb(color);

      if (!rgb) return;

      // Reemplaza los píxeles visibles por el color elegido
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 0) {
          data[i] = rgb.r;
          data[i + 1] = rgb.g;
          data[i + 2] = rgb.b;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }
  }

  private hexToRgb(hex: string) {
    const parsed = hex.replace('#', '');
    if (parsed.length !== 6) return null;

    const r = parseInt(parsed.substring(0, 2), 16);
    const g = parseInt(parsed.substring(2, 4), 16);
    const b = parseInt(parsed.substring(4, 6), 16);
    return { r, g, b };
  }
  
}
