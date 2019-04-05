import {
  RESET_LAYERS,
  ADD_LAYER,
  INIT_SECOND_LAYER_GROUP,
  REORDER_LAYER_GROUP,
  ON_LAYER_HOVER,
  TOGGLE_LAYER_VISIBILITY,
  REMOVE_LAYER,
  UPDATE_OPACITY
} from './constants';
import { resetLayers } from './selectors';
import { cloneDeep as lodashCloneDeep, assign as lodashAssign } from 'lodash';
import update from 'immutability-helper';

export const initialState = {
  active: [],
  activeB: [],
  layersConfig: {},
  hoveredLayer: '',
  layerConfig: {},
  startingLayers: []
};
export function getInitialState(config) {
  return lodashAssign({}, initialState, {
    active: resetLayers(config.defaults.startingLayers, config.layers),
    layerConfig: config.layers,
    startingLayers: config.defaults.startingLayers
  });
}

export function layerReducer(state = initialState, action) {
  const layerGroupStr = action.activeString;
  switch (action.type) {
    case RESET_LAYERS || ADD_LAYER:
      return lodashAssign({}, state, {
        [layerGroupStr]: action.layers
      });
    case INIT_SECOND_LAYER_GROUP:
      if (state.layersB.length > 0) return state;
      return lodashAssign({}, state, {
        layersB: lodashCloneDeep(state.layersA)
      });
    case REORDER_LAYER_GROUP:
      return lodashAssign({}, state, {
        [layerGroupStr]: action.layerArray
      });
    case ON_LAYER_HOVER:
      return lodashAssign({}, state, {
        hoveredLayer: action.active ? action.id : ''
      });
    case TOGGLE_LAYER_VISIBILITY:
      return update(state, {
        [layerGroupStr]: {
          [action.index]: { visible: { $set: action.visible } }
        }
      });
    case REMOVE_LAYER:
      return update(state, {
        [layerGroupStr]: { $splice: [[action.index, 1]] }
      });
    case UPDATE_OPACITY:
      return update(state, {
        [layerGroupStr]: {
          [action.index]: { opacity: { $set: action.opacity } }
        }
      });
    default:
      return state;
  }
}