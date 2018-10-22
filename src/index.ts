import Comparator, { CompareResult } from 'ss-comparator';
import { MinHeap } from 'ss-heap';

export default class PriorityQueue<T> extends MinHeap<T> {
  compare: Comparator;
  priorities: object;
  constructor() {
    super();
    this.priorities = {};
    this.compare = new Comparator(this.comparePriority);
  }
  /**
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  comparePriority = (a: string, b: string): CompareResult => {
    if (this.priorities[a] === this.priorities[b]) {
      return 0;
    }
    return this.priorities[a] < this.priorities[b] ? -1 : 1;
  };
  /**
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue = (a: T, b: T): CompareResult => {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  };

  /**
   * @param {*} item
   * @param {number} [priority]
   * @return {PriorityQueue}
   */
  add(item, priority = 0) {
    this.priorities[item] = priority;
    super.add(item);
    return this;
  }

  /**
   * @param {*} item
   * @param {Comparator} [customFindingComparator]
   * @return {PriorityQueue}
   */
  remove(item, customFindingComparator?: Comparator) {
    super.remove(item, customFindingComparator);
    delete this.priorities[item];
    return this;
  }

  /**
   * @param {*} item
   * @param {number} priority
   * @return {PriorityQueue}
   */
  changePriority(item, priority) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);

    return this;
  }

  /**
   * @param {*} item
   * @return {Number[]}
   */
  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item) {
    return this.findByValue(item).length > 0;
  }
}
