import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zoomPhotoTransform } from '../lib/image-zoom.ts';

test('transform-only zoom preserves cover framing without stretching any photo', () => {
  for (const [width, height] of [[1440, 1000], [440, 800], [956, 440]]) {
    for (const aspect of [1280 / 2276, 1280 / 836, 1280 / 960]) {
      for (const progress of [0, .1, .25, .5, .9, 1]) {
        const w = 230 + (width - 230) * progress;
        const h = 230 + (height - 230) * progress;
        const sx = w / width, sy = h / height;
        const result = zoomPhotoTransform(width, height, sx, sy, aspect, [.5, .58]);
        const photoH = Math.max(height, width / aspect), photoW = photoH * aspect;
        assert.ok(Math.abs(result.scaleX * sx - result.scaleY * sy) < 1e-9, 'Uniform final scale: no distorted food');
        const renderedW = photoW * result.scaleX * sx, renderedH = photoH * result.scaleY * sy;
        assert.ok(renderedW >= w - 1e-9 && renderedH >= h - 1e-9, 'No uncovered mask');
        assert.ok(Math.abs(result.x * sx - (w - renderedW) * .5) < 1e-9, 'Horizontal focal point preserved');
        assert.ok(Math.abs(result.y * sy - (h - renderedH) * .58) < 1e-9, 'Vertical focal point preserved');
      }
    }
  }
});
