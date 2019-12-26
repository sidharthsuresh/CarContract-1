/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class BmwContract extends Contract {

    async bmwExists(ctx, bmwId) {
        const buffer = await ctx.stub.getState(bmwId);
        return (!!buffer && buffer.length > 0);
    }

    async createBmw(ctx, bmwId, value) {
        const exists = await this.bmwExists(ctx, bmwId);
        if (exists) {
            throw new Error(`The bmw ${bmwId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(bmwId, buffer);
    }

    async readBmw(ctx, bmwId) {
        const exists = await this.bmwExists(ctx, bmwId);
        if (!exists) {
            throw new Error(`The bmw ${bmwId} does not exist`);
        }
        const buffer = await ctx.stub.getState(bmwId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateBmw(ctx, bmwId, newValue) {
        const exists = await this.bmwExists(ctx, bmwId);
        if (!exists) {
            throw new Error(`The bmw ${bmwId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(bmwId, buffer);
    }

    async deleteBmw(ctx, bmwId) {
        const exists = await this.bmwExists(ctx, bmwId);
        if (!exists) {
            throw new Error(`The bmw ${bmwId} does not exist`);
        }
        await ctx.stub.deleteState(bmwId);
    }

}

module.exports = BmwContract;
