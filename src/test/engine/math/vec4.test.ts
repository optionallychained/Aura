import { Vec4 } from '../../../engine';

/**
 * Tests for class Vec4
 */
describe('Vec4', () => {

    /**
     * Tests for Vec4 static methods
     */
    describe('Static', () => {

        /**
         * Tests for Vec4.add()
         */
        describe('add', () => {
            it('should add two vectors correctly', () => {
                const x1 = 50, y1 = 50, z1 = 50, w1 = 50, x2 = 100, y2 = 150, z2 = 200, w2 = 250;

                const add = Vec4.add(new Vec4(x1, y1, z1, w1), new Vec4(x2, y2, z2, w2));

                expect(add).toHaveProperty('x', x1 + x2);
                expect(add).toHaveProperty('y', y1 + y2);
                expect(add).toHaveProperty('z', z1 + z2);
                expect(add).toHaveProperty('w', w1 + w2);
            });
        });

        /**
         * Tests for Vec4.sub()
         */
        describe('sub', () => {
            it('should subtract two vectors correctly', () => {
                const x1 = 100, y1 = 100, z1 = 100, w1 = 100, x2 = 50, y2 = 100, z2 = 150, w2 = 200;

                const sub = Vec4.sub(new Vec4(x1, y1, z1, w1), new Vec4(x2, y2, z2, w2));

                expect(sub).toHaveProperty('x', x1 - x2);
                expect(sub).toHaveProperty('y', y1 - y2);
                expect(sub).toHaveProperty('z', z1 - z2);
                expect(sub).toHaveProperty('w', w1 - w2);
            });
        });

        /**
         * Tests for Vec4.mult()
         */
        describe('mult', () => {
            it('should multiply two vectors correctly', () => {
                const x1 = 10, y1 = 15, z1 = 20, w1 = 25, x2 = 10, y2 = 4, z2 = 5, w2 = 6;

                const mult = Vec4.mult(new Vec4(x1, y1, z1, w1), new Vec4(x2, y2, z2, w2));

                expect(mult).toHaveProperty('x', x1 * x2);
                expect(mult).toHaveProperty('y', y1 * y2);
                expect(mult).toHaveProperty('z', z1 * z2);
                expect(mult).toHaveProperty('w', w1 * w2);
            });
        });

        /**
         * Tests for Vec4.div()
         */
        describe('div', () => {
            it('should divide two vectors correctly', () => {
                const x1 = 100, y1 = 60, z1 = 50, w1 = 90, x2 = 10, y2 = 4, z2 = 5, w2 = 3;

                const div = Vec4.div(new Vec4(x1, y1, z1, w1), new Vec4(x2, y2, z2, w2));

                expect(div).toHaveProperty('x', x1 / x2);
                expect(div).toHaveProperty('y', y1 / y2);
                expect(div).toHaveProperty('z', z1 / z2);
                expect(div).toHaveProperty('w', w1 / w2);
            });
        });

        /**
         * Tests for Vec4.scale()
         */
        describe('scale', () => {
            it('should scale a vector correctly', () => {
                const x = 100, y = 200, z = 300, w = 400, factor = 10;

                const scale = Vec4.scale(new Vec4(x, y, z, w), factor);

                expect(scale).toHaveProperty('x', x * factor);
                expect(scale).toHaveProperty('y', y * factor);
                expect(scale).toHaveProperty('z', z * factor);
                expect(scale).toHaveProperty('w', w * factor);
            });
        });

        /**
         * Tests for Vec4.negate()
         */
        describe('negate', () => {
            it('should negate a vector correctly', () => {
                const x = 100, y = 200, z = 300, w = 400;

                const negate = Vec4.negate(new Vec4(x, y, z, w));

                expect(negate).toHaveProperty('x', -x);
                expect(negate).toHaveProperty('y', -y);
                expect(negate).toHaveProperty('z', -z);
                expect(negate).toHaveProperty('w', -w);
            });
        });

        /**
         * Tests for Vec4.invert()
         */
        describe('invert', () => {
            it('should invert a vector correctly', () => {
                const x = 2, y = 5, z = 10, w = 20;

                const invert = Vec4.invert(new Vec4(x, y, z, w));

                expect(invert).toHaveProperty('x', 1 / x);
                expect(invert).toHaveProperty('y', 1 / y);
                expect(invert).toHaveProperty('z', 1 / z);
                expect(invert).toHaveProperty('w', 1 / w);
            });
        });

        /**
         * Tests for Vec4.normalize()
         */
        describe('normalize', () => {
            // nominal usage
            it('should normalize a vector correctly', () => {
                const x = 100, y = 200, z = 300, w = 400;
                const magnitude = Math.hypot(x, y, z, w);

                const normalize = Vec4.normalize(new Vec4(x, y, z, w));

                expect(normalize).toHaveProperty('x', x / magnitude);
                expect(normalize).toHaveProperty('y', y / magnitude);
                expect(normalize).toHaveProperty('z', z / magnitude);
                expect(normalize).toHaveProperty('w', w / magnitude);
            });

            // ensure zero vectors are handled; cover branch in Vec4.normalize()
            it('should handle zero vectors correctly', () => {
                const normalize = Vec4.normalize(new Vec4(0, 0, 0, 0));

                expect(normalize).toHaveProperty('x', 0);
                expect(normalize).toHaveProperty('y', 0);
                expect(normalize).toHaveProperty('z', 0);
                expect(normalize).toHaveProperty('w', 0);
            });
        });

        /**
         * Tests for Vec4.dot()
         */
        describe('dot', () => {
            it('should calculate the dot product correctly', () => {
                const x1 = 10, y1 = 20, z1 = 30, w1 = 40, x2 = 20, y2 = 10, z2 = 40, w2 = 20;

                const dot = Vec4.dot(new Vec4(x1, y1, z1, w1), new Vec4(x2, y2, z2, w2));

                expect(dot).toBe(x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2);
            });
        });

        /**
         * Tests for Vec4.distanceBetween()
         */
        describe('distanceBetween', () => {
            it('should calculate the distance correctly', () => {
                const x1 = 100, y1 = 100, z1 = 100, w1 = 100, x2 = 200, y2 = 200, z2 = 200, w2 = 200;

                const distance = Vec4.distanceBetween(new Vec4(x1, y1, z1, w1), new Vec4(x2, y2, z2, w2));

                expect(distance).toBe(Math.hypot(x2 - x1, y2 - y1, z2 - z1, w2 - w1));
            });
        });
    });

    /**
     * Tests for Vec4 instances and methods
     */
    describe('Instance', () => {

        /**
         * Tests for Vec4 constructor
         */
        describe('construct', () => {
            // default values
            it('should set default values', () => {
                const vector = new Vec4();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', 0);
                expect(vector).toHaveProperty('z', 0);
                expect(vector).toHaveProperty('w', 0);
            });

            // given values
            it('should set given values', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const vector = new Vec4(x, y, z, w);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', w);
            });

        });

        /**
         * Tests for (Vec4).magnitude
         */
        describe('magnitude', () => {
            it('should calculate the magnitude correctly', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const { magnitude } = new Vec4(x, y, z, w);

                expect(magnitude).toBe(Math.hypot(x, y, z, w));
            });
        });

        /**
         * Tests for (Vec4).array
         */
        describe('array', () => {
            it('should give the correct array form', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const { array } = new Vec4(x, y, z, w);

                expect(array).toBeInstanceOf(Array);
                expect(array.length).toBe(4);
                expect(array[0]).toBe(x);
                expect(array[1]).toBe(y);
                expect(array[2]).toBe(z);
                expect(array[3]).toBe(w);
            });
        });

        /**
         * Tests for (Vec4).float32Array
         */
        describe('float32Array', () => {
            it('should give the correct Float32Array form', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const { float32Array } = new Vec4(x, y, z, w);

                expect(float32Array).toBeInstanceOf(Float32Array);
                expect(float32Array.length).toBe(4);
                expect(float32Array[0]).toBe(x);
                expect(float32Array[1]).toBe(y);
                expect(float32Array[2]).toBe(z);
                expect(float32Array[3]).toBe(w);
            });
        });

        /**
         * Tests for (Vec4).string
         */
        describe('string', () => {
            it('should give the correct string form', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const { string } = new Vec4(x, y, z, w);

                expect(string).toBe(`Vec4( ${x} , ${y} , ${z} , ${w} )`);
            });
        });

        /**
         * Tests for (Vec4).set()
         */
        describe('set', () => {
            // default value
            it('should set default values', () => {
                const vector = new Vec4(50, 100, 150, 200);
                vector.set();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', 0);
                expect(vector).toHaveProperty('z', 0);
                expect(vector).toHaveProperty('z', 0);
            });

            // given value
            it('should set given values', () => {
                const x1 = 50, y1 = 100, z1 = 150, w1 = 200, x2 = 100, y2 = 150, z2 = 200, w2 = 250;

                const vector = new Vec4(x1, y1, z1, w1);
                vector.set(x2, y2, z2, w2);

                expect(vector).toHaveProperty('x', x2);
                expect(vector).toHaveProperty('y', y2);
                expect(vector).toHaveProperty('z', z2);
                expect(vector).toHaveProperty('w', w2);
            });
        });

        /**
         * Tests for (Vec4).setX()
         */
        describe('setX', () => {
            // default value
            it('should set default X value', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const vector = new Vec4(x, y, z, w);
                vector.setX();

                expect(vector).toHaveProperty('x', 0);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', w);
            });

            // given value
            it('should set given X value', () => {
                const x1 = 50, x2 = 100, y = 100, z = 150, w = 200;

                const vector = new Vec4(x1, y, z, w);
                vector.setX(x2);

                expect(vector).toHaveProperty('x', x2);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', w);
            });
        });

        /**
         * Tests for (Vec4).setY()
         */
        describe('setY', () => {
            // default value
            it('should set default Y value', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const vector = new Vec4(x, y, z, w);
                vector.setY();

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', 0);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', w);
            });

            // given value
            it('should set given Y value', () => {
                const x = 50, y1 = 100, y2 = 150, z = 150, w = 200;

                const vector = new Vec4(x, y1, z, w);
                vector.setY(y2);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y2);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', w);
            });
        });

        /**
         * Tests for (Vec4).setZ()
         */
        describe('setZ', () => {
            // default value
            it('should set default Z value', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const vector = new Vec4(x, y, z, w);
                vector.setZ();

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', 0);
                expect(vector).toHaveProperty('w', w);
            });

            // given value
            it('should set given Z value', () => {
                const x = 50, y = 100, z1 = 150, z2 = 200, w = 200;

                const vector = new Vec4(x, y, z1, w);
                vector.setZ(z2);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z2);
                expect(vector).toHaveProperty('w', w);
            });
        });

        /**
        * Tests for (Vec4).setW()
        */
        describe('setW', () => {
            // default value
            it('should set default W value', () => {
                const x = 50, y = 100, z = 150, w = 200;

                const vector = new Vec4(x, y, z, w);
                vector.setW();

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', 0);
            });

            // given value
            it('should set given W value', () => {
                const x = 50, y = 100, z = 150, w1 = 200, w2 = 250;

                const vector = new Vec4(x, y, z, w1);
                vector.setW(w2);

                expect(vector).toHaveProperty('x', x);
                expect(vector).toHaveProperty('y', y);
                expect(vector).toHaveProperty('z', z);
                expect(vector).toHaveProperty('w', w2);
            });
        });

        /**
         * Tests for (Vec4).clone()
         */
        describe('clone', () => {
            it('should clone a vector correctly', () => {
                const vector = new Vec4(50, 100, 150, 200);
                const cloned = vector.clone();

                expect(cloned).toHaveProperty('x', vector.x);
                expect(cloned).toHaveProperty('y', vector.y);
                expect(cloned).toHaveProperty('z', vector.z);
                expect(cloned).toHaveProperty('w', vector.w);
            });
        });
    });
});
