import React, { Component } from 'react';
import { Link } from 'react-router';
// import { Flex, Box, Grid } from 'reflexbox';

export default class Welcome extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Steiner</h1>
                    {user 
                        ? <h3>Welcome <span className="text-primary">{user.email}</span></h3>
                        : <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                    }
                </div>
            </div>
        );
    }
}

// export default class Welcome extends Component {
//     render() {
//         return (
//             <Flex 
//                 wrap
//                 flexColumn
//                 style={{ height: 'calc(100vh - 80px)'}}
//             >
//                 <Box
//                     col={12}
//                 >
//                     <h1>Filter Bar</h1>
//                 </Box>
//                 <Box
//                     col={12}
//                     style={{ flexGrow: 1 }}
//                 >
//                     <table className="table table-striped"><thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th></tr></thead><tbody><tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr><tr><th scope="row">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr><tr><th scope="row">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr></tbody></table>
//                 </Box>
//                 <Box
//                     col={12}
//                 >
//                     <h1>Bottom Bar</h1>
//                 </Box>
//             </Flex>
//         );
//     }
// }