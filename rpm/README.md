# RPM build / CentOS 6

This RPM build is specific to the Worldview production system and is not
meant to be used for other purposes.

A Dockerfile was created to test the build but this ran into problems
when using `npm install` on macOS:

https://github.com/docker/for-mac/issues/2296

Testing is now best done on a virtual machine. Use the commands in the
Dockerfile to setup the VM.

One of the node.js modules requires a C+11 compiler. Install the
developer toolset below:

https://www.softwarecollections.org/en/scls/rhscl/devtoolset-6/

Test the RPM build with the following:

```
scl enable devtoolset-6 bash
npm run distclean
npm install
npm run dist
rpm/buildRPM.js
```

RPM will be found in the `dist` directory.

## Bamboo

The RPM is generated by Bamboo by running the `tasks/buildAll.sh` script.
Bamboo also clones a separate repository that contains the `bitly.json`
configuration and places it in the repository root.



