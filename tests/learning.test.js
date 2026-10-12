import test from 'node:test';
import assert from 'node:assert/strict';
import {parts,assemblyOrder,checkPlacement,questions,scoreAnswers} from '../src/data.js';
test('Assembly rejects misplaced components and accepts the complete sequence',()=>{assert.equal(checkPlacement([],'cpu'),false);const installed=[];for(const id of assemblyOrder){assert.equal(checkPlacement(installed,id),true);installed.push(id);}assert.equal(new Set(installed).size,parts.length);assert.equal(checkPlacement(installed,'board'),false);});
test('Quiz scores complete, incomplete and incorrect attempts',()=>{assert.equal(scoreAnswers(questions.map(q=>q.answer)),7);assert.equal(scoreAnswers([]),0);assert.equal(scoreAnswers(questions.map(q=>(q.answer+1)%4)),0);assert.equal(scoreAnswers([questions[0].answer]),1);});
test('Every question has four options and a valid answer',()=>{for(const q of questions){assert.equal(q.options.length,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.why.length>15);}assert.equal(new Set(questions.map(q=>q.answer)).size,4);});
