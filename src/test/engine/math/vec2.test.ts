import { Vec2 } from '../../../engine';

/**
 * Tests for class Vec2
 */
describe('Vec2', () => {

    /**
     * Tests for Vec2 static methods
     */
    describe('Static', () => {

        /**
         * Tests for Vec2.add()
         */
        describe('add', () => {
            it('should add two vectors correctly', () => {
                const x1 = 50, y1 = 50, x2 = 100, y2 = 150;

                const add = Vec2.add(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(add).toHaveProperty('x', x1 + x2);
                expect(add).toHaveProperty('y', y1 + y2);
            });
        });

        /**
         * Tests for Vec2.sub()
         */
        describe('sub', () => {
            it('should subtract two vectors correctly', () => {
                const x1 = 100, y1 = 100, x2 = 50, y2 = 100;

                const sub = Vec2.sub(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(sub).toHaveProperty('x', x1 - x2);
                expect(sub).toHaveProperty('y', y1 - y2);
            });
        });

        /**
         * Tests for Vec2.mult()
         */
        describe('mult', () => {
            it('should multiply two vectors correctly', () => {
                const x1 = 10, y1 = 15, x2 = 10, y2 = 4;

                const mult = Vec2.mult(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(mult).toHaveProperty('x', x1 * x2);
                expect(mult).toHaveProperty('y', y1 * y2);
            });
        });

        /**
         * Tests for Vec2.div()
         */
        describe('div', () => {
            it('should divide two vectors correctly', () => {
                const x1 = 100, y1 = 60, x2 = 10, y2 = 4;

                const div = Vec2.div(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(div).toHaveProperty('x', x1 / x2);
                expect(div).toHaveProperty('y', y1 / y2);
            });
        });

        /**
         * Tests for Vec2.scale()
         */
        describe('scale', () => {
            it('should scale a vector correctly', () => {
                const x = 100, y = 200, factor = 10;

                const scale = Vec2.scale(new Vec2(x, y), factor);

                expect(scale).toHaveProperty('x', x * factor);
                expect(scale).toHaveProperty('y', y * factor);
            });
        });

        /**
         * Tests for Vec2.negate()
         */
        describe('negate', () => {
            it('should negate a vector correctly', () => {
                const x = 100, y = 200;

                const negate = Vec2.negate(new Vec2(x, y));

                expect(negate).toHaveProperty('x', -x);
                expect(negate).toHaveProperty('y', -y);
            });
        });

        /**
         * Tests for Vec2.invert()
         */
        describe('invert', () => {
            it('should invert a vector correctly', () => {
                const x = 2, y = 5;

                const invert = Vec2.invert(new Vec2(x, y));

                expect(invert).toHaveProperty('x', 1 / x);
                expect(invert).toHaveProperty('y', 1 / y);
            });
        });

        /**
         * Tests for Vec2.normalize()
         */
        describe('normalize', () => {
            // nominal usage
            it('should normalize a vector correctly', () => {
                const x = 100, y = 200;
                const magnitude = Math.hypot(x, y);

                const normalize = Vec2.normalize(new Vec2(x, y));

                expect(normalize).toHaveProperty('x', x / magnitude);
                expect(normalize).toHaveProperty('y', y / magnitude);
            });

            // ensure zero vectors are handled; cover branch in Vec2.normalize()
            it('should handle zero vectors correctly', () => {
                const normalize = Vec2.normalize(new Vec2(0, 0));

                expect(normalize).toHaveProperty('x', 0);
                expect(normalize).toHaveProperty('y', 0);
            });
        });

        /**
         * Tests for Vec2.dot()
         */
        describe('dot', () => {
            it('should calculate the dot product correctly', () => {
                const x1 = 10, y1 = 20, x2 = 20, y2 = 10;

                const dot = Vec2.dot(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(dot).toBe(x1 * x2 + y1 * y2);
            });
        });

        /**
         * Tests for Vec2.cross()
         */
        describe('cross', () => {
            it('should cross two vectors correctly', () => {
                const x1 = 10, y1 = 20, x2 = 20, y2 = 10;

                const cross = Vec2.cross(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(cross).toHaveProperty('x', 0);
                expect(cross).toHaveProperty('y', 0);
                expect(cross).toHaveProperty('z', x1 * y2 - y1 * x2)
            });
        });

        /**
         * Tests for Vec2.distanceBetween()
         */
        describe('distanceBetween', () => {
            it('should calculate the distance correctly', () => {
                const x1 = 100, y1 = 100, x2 = 200, y2 = 200;

                const distance = Vec2.distanceBetween(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(distance).toBe(Math.hypot(x2 - x1, y2 - y1));
            });
        });

        /**
         * Tests for Vec2.angleBetween()
         */
        describe('angleBetween', () => {
            // nominal usage
            it('should calculate the angle correctly', () => {
                const x1 = 100, y1 = 100, x2 = 200, y2 = 200;
                const magProduct = Math.hypot(x1, y1) * Math.hypot(x2, y2);
                const dot = x1 * x2 + y1 * y2;

                const angle = Vec2.angleBetween(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(angle).toBe(Math.acos(dot / magProduct));
            });

            // ensure zero vectors are handled; cover branch in Vec2.normalize()
            // TODO this test is based on potentially-wrong behavior
            it('should handle zero vectors correctly', () => {
                const x1 = 0, y1 = 0, x2 = 200, y2 = 200;

                const angle = Vec2.angleBetween(new Vec2(x1, y1), new Vec2(x2, y2));

                expect(angle).toBe(0);
            });
        });

        /**
         * Tests for Vec2.rotate()
         */
        describe('rotate', () => {
            it('should rotate a vector correctly', () => {
                const x = 100, y = 200, angle = 60 * (Math.PI / 180);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                const rotate = Vec2.rotate(new Vec2(x, y), angle);

                expect(rotate).toHaveProperty('x', x * cos - y * sin);
                expect(rotate).toHaveProperty('y', x * sin + y * cos);
            })
        });
    });

    /**
     * Tests for Vec2 instances and methods
     */
    describe('Instance', () => {

        /**
         * Tests for Vec2 constructor
         */
        describe('construct', () => {
            // default values
            it('should set default values', () => {
                const vector = new Vec2();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', 0);
            });

            // given values
            it('should set given values', () => {
                const x = 50, y = 100;

                const vector = new Vec2(x, y);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
            });

        });

        /**
         * Tests for (Vec2).magnitude
         */
        describe('magnitude', () => {
            it('should calculate the magnitude correctly', () => {
                const x = 50, y = 100;

                const { magnitude } = new Vec2(x, y);

                expect(magnitude).toBe(Math.hypot(x, y));
            });
        });

        /**
         * Tests for (Vec2).array
         */
        describe('array', () => {
            it('should give the correct array form', () => {
                const x = 50, y = 100;

                const { array } = new Vec2(x, y);

                expect(array).toBeInstanceOf(Array);
                expect(array.length).toBe(2);
                expect(array[0]).toBe(x);
                expect(array[1]).toBe(y);
            });
        });

        /**
         * Tests for (Vec2).float32Array
         */
        describe('float32Array', () => {
            it('should give the correct Float32Array form', () => {
                const x = 50, y = 100;

                const { float32Array } = new Vec2(x, y);

                expect(float32Array).toBeInstanceOf(Float32Array);
                expect(float32Array.length).toBe(2);
                expect(float32Array[0]).toBe(x);
                expect(float32Array[1]).toBe(y);
            });
        });

        /**
         * Tests for (Vec2).string
         */
        describe('string', () => {
            it('should give the correct string form', () => {
                const x = 50, y = 100;

                const { string } = new Vec2(x, y);

                expect(string).toBe(`Vec2( ${x} , ${y} )`);
            });
        });

        /**
         * Tests for (Vec2).set()
         */
        describe('set', () => {
            // default value
            it('should set default values', () => {
                const vector = new Vec2(50, 100);
                vector.set();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', 0);
            });

            // given value
            it('should set given values', () => {
                const x1 = 50, y1 = 100, x2 = 100, y2 = 150;

                const vector = new Vec2(x1, y1);
                vector.set(x2, y2);

                expect(vector).toHaveProperty('x', x2);
                expect(vector).toHaveProperty('y', y2);
            });
        });

        /**
         * Tests for (Vec2).setX()
         */
        describe('setX', () => {
            // default value
            it('should set default X value', () => {
                const x = 50, y = 100;

                const vector = new Vec2(x, y);
                vector.setX();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', y);
            });

            // given value
            it('should set given X value', () => {
                const x1 = 50, y = 100, x2 = 100;

                const vector = new Vec2(x1, y);
                vector.setX(x2);

                expect(vector).toHaveProperty('x', x2);
                expect(vector).toHaveProperty('y', y);
            });
        });

        /**
         * Tests for (Vec2).setY()
         */
        describe('setY', () => {
            // default value
            it('should set default Y value', () => {
                const x = 50, y = 100;

                const vector = new Vec2(x, y);
                vector.setY();

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', 0);
            });

            // given value
            it('should set given Y value', () => {
                const x = 50, y1 = 100, y2 = 150;

                const vector = new Vec2(x, y1);
                vector.setY(y2);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y2);
            });
        });

        /**
         * Tests for (Vec2).clone()
         */
        describe('clone', () => {
            it('should clone a vector correctly', () => {
                const vector = new Vec2(50, 100);
                const cloned = vector.clone();

                expect(cloned).toHaveProperty('x', vector.x);
                expect(cloned).toHaveProperty('y', vector.y);
            });
        });
    });
});
