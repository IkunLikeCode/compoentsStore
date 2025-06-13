export function createNamespace(name: string) {
  const prefixName = `z-${name}`;
  return createBem(prefixName);
}

function createBem(prefixName: string) {
  const b = (blockSuffix: string = "") => {
    return _bem(prefixName, blockSuffix, "", "");
  };
  const e = (element: string = "") => {
    return element ? _bem(prefixName, "", element, "") : "";
  };
  const m = (modifier: string = "") => {
    return modifier ? _bem(prefixName, "", "", modifier) : "";
  };

  const be = (blockSuffix: string, element: string) => {
    return _bem(prefixName, blockSuffix, element, "");
  };
  const em = (element: string, modifier: string) => {
    return element ? _bem(prefixName, "", element, modifier) : "";
  };
  const bm = (blockSuffix: string, modifier: string) => {
    return _bem(prefixName, blockSuffix, "", modifier);
  };
  const bem = (blockSuffix: string, element: string, modifier: string) => {
    return _bem(prefixName, blockSuffix, element, modifier);
  };
  const is = (name: string, state: boolean) => {
    return state ? `is-${name}` : "";
  };

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  };
}

function _bem(
  prefixName: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }

  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}
