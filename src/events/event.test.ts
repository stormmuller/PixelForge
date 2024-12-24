import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Event } from './event';

describe('When creating an event', () => {
  const event = new Event('test-event');
  const logic = vi.fn();
  const listener = async () => {
    logic('processed event');
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
        event.raise();

        expect(logic).toHaveBeenCalledOnce();
        expect(logic).toHaveBeenCalledWith('processed event');
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
