import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/**
 * @param notifier when emits value, will trigger the last value repetition
 */
export function repeatLatestWhen<T>(notifier: Observable<any>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => new Observable(subscriber => {
    let latestValue: T;
    let hasLatestValue = false;

    const subscription = source.subscribe({
      next: value => {
        latestValue = value;
        hasLatestValue = true;
        subscriber.next(value);
      },
      error: err => subscriber.error(err),
      complete: () => subscriber.complete()
    });

    const repeatSubscription = notifier.subscribe(() => {
      if (!hasLatestValue || subscription.closed) {
        return;
      }

      subscriber.next(latestValue);
    });

    return () => {
      latestValue = null;
      subscription.unsubscribe();
      repeatSubscription.unsubscribe();
    };
  });
}
