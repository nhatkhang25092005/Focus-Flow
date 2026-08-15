import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Slider from '../../components/Slider/Slider';
import {useSlider} from '../../components/Slider/Slider';

function TestButton({direction}: {direction: 'top' | 'left' | 'bottom' | 'right'}) {
  const {goto} = useSlider();
  return <button onClick={() => goto(direction)}>Go {direction}</button>;
}

describe('Slider', () => {
  it("Should navigate between slides" , () => {
    const matrix = [
      ["slide1", "slide2"],
      ["slide3", null]
    ];
    render(
      <Slider item2DMatrix={matrix} firstDisplayItemId="slide1">
        <Slider.Slide id="slide1" navigation={{right: "slide2", bottom:'slide3'}}><TestButton direction='right'/><TestButton direction='bottom'/></Slider.Slide>
        <Slider.Slide id="slide2" navigation={{left: "slide1"}}><TestButton direction='left'/></Slider.Slide>
        <Slider.Slide id="slide3" navigation={{top: "slide2"}}><TestButton direction='top'/></Slider.Slide>
      </Slider>
    );

    const grid = screen.getByText('Go right').parentElement?.parentElement;
    expect(grid).toHaveStyle({transform: 'translate(0%, 0%)'});
    fireEvent.click(screen.getByText('Go right'));
    expect(grid).toHaveStyle({transform: 'translate(-100%, 0%)'});
    fireEvent.click(screen.getByText('Go left'));
    expect(grid).toHaveStyle({transform: 'translate(0%, 0%)'});
    fireEvent.click(screen.getByText('Go bottom'));
    expect(grid).toHaveStyle({transform: 'translate(0%, -100%)'});
  })
})