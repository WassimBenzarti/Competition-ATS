import React from 'react';
import useUsersApi from './specific/useUsersApi';
import sortByScore from './specific/sortByScore';
import styled from 'styled-components';
import Title from "./common/Title/Title"
import Text from './common/Text/Text';
import ResponsiveUtils from './common/Responsivness/Responsivness';
import getEmojiByOrder from './specific/getEmojiByOrder';


const COLS = {
  username: { title: "Username", display: (item, order) => item + getEmojiByOrder(order) },
  totalThrottleMs: { title: "Total throttle (ms)" },
  nuggetCount: { title: "nuggetCount" },
  attacking: { title: "Attacking", display: (item) => item.map(user => user.username).join("\n") || "No body" },
  attackedBy: { title: "Attacked by", display: (item) => item.map(user => user.username).join("\n") || "No body" },
  role: { title: "Role" },
}

const Row = styled.tr`
  ${({ column }) => column ? `background-color:#EEE;` : "background:white;"}
  ${({ elevate }) => `transform:scale(${1 + elevate * 0.05});`}
  
  z-index:${({ elevate }) => elevate};
  position:relative;
`

function App() {

  const { users, isLoading } = useUsersApi();

  console.log(users)

  return (
    <div className="App" >
      <Title style={{
        marginLeft: 50,
      }}>
        Leaderboard
      </Title>
      <table border="0" style={{
        display: 'table',
        margin: "auto"
      }}>
        <Row column>
          {
            Object.entries(COLS).map(([key, col], index) => (
              <td style={{
                minWidth: 100,
              }} key={index}>
                <Text small bold style={{ textAlign: "center" }}>
                  {col.title}
                </Text>
              </td>
            ))
          }
        </Row>
        {
          users
          && users.sort(sortByScore).map((user, rowIndex) => (
            <Row key={rowIndex}
              elevate={Math.max(3 - rowIndex, 0)}
              style={{
                width: ResponsiveUtils.choose({ mobile: "100%", other: "80%" }),
                ...(rowIndex < 3 && {
                  opacity: 1,
                  /*transform: `scale(1.05)`,*/
                  boxShadow: "0 5px 8px rgba(0,0,0,.15)"
                })
              }}>
              {
                Object.entries(COLS).map(([key, col], index) => (
                  <td key={index} style={{
                    whiteSpace: "pre-wrap",
                    padding: 10,
                    minWidth: 100,
                  }}>
                    <Text small>
                      {col.display
                        ? col.display(user[key], rowIndex)
                        : user[key]
                      }
                    </Text>
                  </td>
                ))
              }
            </Row>
          ))
        }
      </table>
    </div>
  );
}

export default App;
