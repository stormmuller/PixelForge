import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ParameterisedEvent } from './parameterised-event';

describe('When creating an event', () => {
  const event = new ParameterisedEvent<string>('test-event');
  const logic = vi.fn();
  const listener = async (data: string) => {
    logic(`processed ${data}`);
  };

  beforeEach(() => {
    event.clear();
  });

  describe('and doing nothing else', () => {
    test('it should have no listeners by default', () => {
      expect(event.listeners.length).toBe(0);
    });
  });

  describe('and registering a listener', () => {
    test('it should have one listener', () => {
      event.registerListener(listener);

      expect(event.listeners.length).toBe(1);
    });

    describe('and raising an event', () => {
      test('it should call the listener', () => {
        event.registerListener(listener);
        event.raise('yeet');

        expect(logic).toHaveBeenCalledOnce();
        expect(logic).toHaveBeenCalledWith('processed yeet');
      });
    });

    describe('and deregistering the listener', () => {
      test('it should have no listeners', () => {
        event.registerListener(listener);
        event.deregisterListener(listener);
        
        expect(event.listeners.length).toBe(0);
      });
    });
  });
});
