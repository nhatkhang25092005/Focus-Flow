import {render, screen, fireEvent} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Slider from '../../components/Slider/Slider';
import {useSlider} from '../../share/context/SliderContext';

function TestButton({target}: {target: string}) {
  const {goto} = useSlider();
  return <button onClick={() => goto(target)}>Go to {target}</button>;
}

describe('Slider', () => {
  it("Should navigate between slides" , () => {
    const matrix = [
      ["slide1", "slide2"],
      ["slide3", null]
    ];
    render(
      <Slider item2DMatrix={matrix} firstDisplayItemId="slide1">
        <Slider.Slide id="slide1"><TestButton target='slide2'/><TestButton target='slide3'/></Slider.Slide>
        <Slider.Slide id="slide2"><TestButton target='slide1'/></Slider.Slide>
        <Slider.Slide id="slide3"><TestButton target='missing'/></Slider.Slide>
      </Slider>
    );

    const grid = screen.getByText('Go to slide2').parentElement?.parentElement;
    expect(grid).toHaveStyle({transform: 'translate(0%, 0%)'});
    fireEvent.click(screen.getByText('Go to slide2'));
    expect(grid).toHaveStyle({transform: 'translate(-100%, 0%)'});
    fireEvent.click(screen.getByText('Go to slide1'));
    expect(grid).toHaveStyle({transform: 'translate(0%, 0%)'});
    fireEvent.click(screen.getByText('Go to slide3'));
    expect(grid).toHaveStyle({transform: 'translate(0%, -100%)'});
  })
})
