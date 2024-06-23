const test = require('node:test');
const assert = require('assert');
const { BoundedQueue } = require('./BoundedQueue');



// Test constructor: C1, C2, {TT, FF}
// Case1: TT
test("Test BoundedQueue's constructor case1", () => {
	bq = new BoundedQueue(10);
	assert.strictEqual(bq.is_empty(), true);
});

// Test constructor: C1, C2, {TT, FF}
// Case2: FF
test("Test BoundedQueue's constructor case2", () => {
	const res = () =>  new BoundedQueue(-10);
	expected = RangeError("capacity is less than 0");
	assert.throws(res, expected);
});


// Test enqueue: C3, C4, C7 {TTT, FFT, FTF, FFF}
// Case1: TTT
test("Test BoundedQueue's enqueue case1", () => {
	bq = new BoundedQueue(10);
	bq.enqueue(0);
	
	assert.strictEqual(bq.is_full(), false);
	assert.strictEqual(bq.enqueue(1), undefined);
});

// Case2: FTF
test("Test BoundedQueue's enqueue case2", () => {
	bq = new BoundedQueue(3);
	bq.enqueue(0);
	bq.enqueue(1);
	bq.enqueue(2);
	
	assert.strictEqual(bq.is_full(), true);
	expected = Error("queue is full");
	const res = () => bq.enqueue(4);
	assert.throws(res, expected);
});

// Case3: FFT
test("Test BoundedQueue's enqueue case3", () => {
	bq = new BoundedQueue(3);
	bq.enqueue(0);
	bq.enqueue(1);
	
	assert.strictEqual(bq.is_full(), false);
	expected = RangeError("element is invalid");
	const res = () => bq.enqueue('c');
	assert.throws(res, expected);
});

// Case4: FFF
test("Test BoundedQueue's enqueue case4", () => {
	bq = new BoundedQueue(3);
	bq.enqueue(0);
	bq.enqueue(1);
	bq.enqueue(2);
	
	assert.strictEqual(bq.is_full(), true);
	expected = RangeError("element is invalid");
	const res = () => bq.enqueue('c');
	assert.throws(res, expected);
});



// Test dequeue: C5, C6, {TT, FF}
// Case1: TT
test("Test BoundedQueue's dequeue case1", () => {
	bq = new BoundedQueue(10);
	bq.enqueue(0);
	
	assert.strictEqual(bq.is_empty(), false);
	assert.strictEqual(bq.dequeue(), 0);
});

// Test dequeue: C5, C6, {TT, FF}
// Case2: FF
test("Test BoundedQueue's dequeue case2", () => {
	bq = new BoundedQueue(10);
	
	assert.strictEqual(bq.is_empty(), true);
	const res = () => bq.dequeue();
	assert.throws(res, Error("queue is empty"));
});


// Test is_empty: C6, {T, F}
// Case1: T
test("Test BoundedQueue's is_empty case1", () => {
	bq = new BoundedQueue(3);
	assert.strictEqual(bq.is_empty(), true);
});

// Test is_empty: C6, {T, F}
// Case2: F
test("Test BoundedQueue's is_empty case2", () => {
	bq = new BoundedQueue(3);
	bq.enqueue(0);
	assert.strictEqual(bq.is_empty(), false);
});


// Test is_full: C6, {T, F}
// Case1: T
test("Test BoundedQueue's is_full case1", () => {
	bq = new BoundedQueue(3);
	bq.enqueue(0);
	bq.enqueue(1);
	bq.enqueue(2);
	assert.strictEqual(bq.is_full(), true);
});

// Test is_full: C6, {T, F}
// Case2: F
test("Test BoundedQueue's is_full case2", () => {
	bq = new BoundedQueue(3);
	assert.strictEqual(bq.is_full(), false);
});